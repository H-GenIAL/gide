import logging

from gide_rag.shared.config_loaders.config_prompt import load_prompts_from_config
from gide_rag.shared.entities import Chunk
from gide_rag.shared.entities.datapoint import DataPoint
from gide_rag.shared.constants import DocumentType
from gide_rag.shared.constants.languages import Language
from gide_rag.modules.extract.tasks.parse import Output
from gide_rag.modules.index.indexer_pipeline import OPENAI_CIENT
from gide_rag.shared.constants.datapoint_types import DatapointType
from llm.open_ai.conf import IMAGE_COMPLETION_ENGINE, TEXT_COMPLETION_ENGINE

logger = logging.getLogger(__name__)


class Extractor:
    def __init__(self):

        return

    def extract_data_point(
        self,
        top_chunks: list[Chunk],
        datapoint: DataPoint,
        document_type: DocumentType,
        language: Language,
    ):
        """
        Extract data point from relevant chunks using the provided LLM.

        Args:
            relevant_chunks (List[Chunk]): List of document chunks to search for relevant data.
            datapoint (DataPoint): Data point containing the id and prompt to extract.
            llm (LLM): Language model instance for running the extraction process.

        Returns:
            str: The extracted data as a JSON string.
        """
        if not top_chunks:
            logger.warning(f"No relevant chunks found for datapoint '{datapoint.id}'.")
            return f'{{"{datapoint.id}": ""}}'

        question = datapoint.generator_query
        instruction = datapoint.generator_instruction
        keys = [datapoint.id]

        prompt_template = load_prompts_from_config(
            document_type=document_type,
            language=language,
            datapoint_type=datapoint.type,
        )

        if datapoint.type == DatapointType.TEXT:
            model = TEXT_COMPLETION_ENGINE
            context = "\n\n".join([x.page_content for x in top_chunks])

            if datapoint.unit:
                keys.append("unit")

            completion_prompt = (
                prompt_template.replace("{{CONTEXT}}", context)
                .replace("{{INSTRUCTION}}", instruction)
                .replace("{{KEYS}}", ", ".join(keys))
                .replace("{{QUESTION}}", question)
            )
            content = [{"type": "text", "text": completion_prompt}]

        elif datapoint.type == DatapointType.IMAGE:
            model = IMAGE_COMPLETION_ENGINE

            completion_prompt = (
                prompt_template.replace("{{INSTRUCTION}}", instruction)
                .replace("{{KEYS}}", ", ".join(keys))
                .replace("{{QUESTION}}", question)
            )

            content = [{"type": "text", "text": completion_prompt}]
            for x in top_chunks:
                content.append(
                    {
                        "type": "image_url",
                        "image_url": {
                            "url": f"data:image/jpeg;base64,{x.page_content}",
                            "detail": "high",  # for detailed analysis
                        },
                    }
                )

        #! Add response format of openai
        llm_answer = OPENAI_CIENT.completion(
            model=model,
            content=content,
            max_tokens=datapoint.generator_conf["max_tokens"],
            temperature=datapoint.generator_conf["temperature"],
            top_p=datapoint.generator_conf["top_p"],
        )

        output = Output(raw=llm_answer)
        logger.info(f"Extracted answer for datapoint '{datapoint.id}': {llm_answer}")

        return output
