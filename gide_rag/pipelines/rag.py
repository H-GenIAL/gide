import logging
from gide_rag.shared.entities.datapoint import DataPoint
from gide_rag.shared.entities.extracted_data import ExtractedData
from gide_rag.shared.entities import Context
from gide_rag.modules.retrieve.retriever_pipeline import Retriever
from gide_rag.modules.extract.extractor_pipeline import Extractor

logger = logging.getLogger(__name__)


class RAGForDataPointExtraction:
    """
    Orchestrates Retrieval-Augmented Generation (RAG) for extracting data points from documents.
    """

    def __init__(self, retriever: Retriever = None, extractor: Extractor = None):
        """
        Initialize the RAG pipeline with a retriever and an extractor.
        Args:
            retriever (Retriever): A retriever instance for retrieving relevant chunks.
            extractor (Extractor): An extractor instance for extracting data points.
        """
        self.retriever = retriever or Retriever()
        self.extractor = extractor or Extractor()

    def extract_data_point(
        self, context: Context, data_point: DataPoint
    ) -> ExtractedData:
        """
        Extract a specific data point from a document using Retrieval-Augmented Generation (RAG).
        Args:
            context (Context): The document context containing metadata, language, and document type.
            data_point (DataPoint): The data point to extract, including its prompt and configuration.
        Returns:
            ExtractedData: The extracted data point, confidence score, and relevant chunks.
        """
        try:
            logger.info(f"Retrieving relevant chunks for data point: {data_point.name}")
            # Step 1: Retrieve relevant chunks
            top_chunks = self.retriever.get_top_chunks(
                context.document.filename, data_point, context.document_type
            )
            # Step 2: Extract the data point
            output = self.extractor.extract_data_point(
                top_chunks, data_point, context.document_type, context.document.language
            )
            # Step 3: Return extracted data
            found_data = ExtractedData(data_point, output, 0.9, top_chunks)
            logger.info(f"Successfully extracted data point: {data_point.name}")
            return found_data
        except Exception as e:
            logger.error(
                f"Error during RAG process for data point '{data_point.name}': {e}"
            )
            raise RuntimeError(f"Failed to extract data point: {data_point.name}")
