from abc import ABC, abstractmethod
from gide_rag.shared.entities import Context
from gide_rag.shared.entities.extracted_data import ExtractedData

__all__ = ["DocumentPipeline"]


class DocumentPipeline(ABC):
    """
    Base Pipeline class that defines the interface and shared behavior
    for all document extraction pipelines.
    """

    def __init__(self, context: Context):
        """
        Initialize the pipeline with the context.

        Args:
            context (Context): The context containing the document and configuration
        """
        self.context = context

    @abstractmethod
    def run(self) -> dict[str, ExtractedData]:
        """
        Abstract method that all pipelines must implement to define
        the extraction logic for the document.
        """
        pass
