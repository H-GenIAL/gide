import logging

from gide_rag.modules.read.reader_pipeline import parse_document
from gide_rag.shared.entities import Context
from gide_rag.shared.entities.extracted_data import ExtractedData

from gide_rag.pipelines.docs.base import DocumentPipeline
from gide_rag.pipelines.rag import RAGForDataPointExtraction
from gide_rag.modules.index.indexer_pipeline import Indexer
from gide_rag.shared.constants.chunking_types import ChunkType

logging.basicConfig(level=logging.INFO)

__all__ = ["EPCPipeline"]


class EPCPipeline(DocumentPipeline):
    """
    Pipeline to extract data points from an Energy Performance Certificate (EPC)

    Args:
        context (Context): Context object with the document to be processed

    Returns:
        List[ExtractedData]: List of ExtractedData objects with the extracted data points
    """

    def __init__(self, context: Context):
        self.context = context
        self.chunk_type = ChunkType.PAGE
        self.indexer = Indexer()
        self.rag_pipeline = RAGForDataPointExtraction()

    def run(self) -> dict[str, ExtractedData]:
        logging.info("Running EPC extraction pipeline...")

        # chunk document
        chunks = parse_document(self.context.document, self.chunk_type)

        # Index chunks
        _ = self.indexer.index_text(chunks["text"], self.context.document_type)
        _ = self.indexer.index_image(chunks["image"], self.context.document_type)

        # Extract using RAG
        extracted_data = {}
        for data_point in self.context.datapoints:

            extracted_data[data_point.id] = self.rag_pipeline.extract_data_point(
                self.context, data_point
            )

        return extracted_data
