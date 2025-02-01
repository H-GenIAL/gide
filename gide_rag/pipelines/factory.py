from gide_rag.pipelines.docs.base import DocumentPipeline
from gide_rag.pipelines.docs.epc import EPCPipeline
from gide_rag.shared.constants.document_types import DocumentType
from gide_rag.shared.entities.context import Context

__all__ = ["get_pipeline"]


def get_pipeline(context: Context) -> DocumentPipeline:
    """
    Returns the pipeline based on the document type.

    Args:
        document_type (str): The type of the document (e.g., 'epc', 'invoice')

    Returns:
        Pipeline class for the specified document type
    """
    document_type = context.document_type
    print(document_type)
    if document_type == DocumentType.ENERGY_PERFORMANCE_CERTIFICATE:
        return EPCPipeline(context)
    # elif document_type == DocumentType.INVOICE:
    #     return InvoicePipeline(context)
    else:
        raise ValueError(f"Unsupported document type: {document_type}")
