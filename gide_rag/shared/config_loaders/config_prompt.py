import logging
import yaml
from enum import Enum
from gide_rag.shared.constants import CONFIG_DIRECTORY, DocumentType
from gide_rag.shared.constants.languages import Language
from gide_rag.shared.constants.datapoint_types import DatapointType

logger = logging.getLogger(__name__)

PROMPT_FILE = "prompt.yml"


def load_prompts_from_config(
    document_type: DocumentType,
    language: Language,
    datapoint_type: DatapointType = "text",
) -> str:
    """
    Load all prompts from the YAML config file once and cache them for reuse.
    """

    if isinstance(document_type, Enum):
        doc_type = document_type.value
    else:
        doc_type = document_type

    config_directory = CONFIG_DIRECTORY / doc_type
    config_file = config_directory / PROMPT_FILE

    try:
        with open(config_file, "r") as file:
            config = yaml.safe_load(file)
            prompt_template = config["system_prompt"][language.value][datapoint_type]
            prompt_template = prompt_template[
                max(prompt_template.keys(), key=lambda k: int(k[1:]))
            ]
        return prompt_template
    except Exception as e:
        logger.error(f"Failed to load prompt config : {e}")
        raise
