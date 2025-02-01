import logging

from fastapi import HTTPException

from gide_rag.shared.constants.document_types import DocumentType
from gide_rag.shared.constants.languages import Language

logger = logging.getLogger(__name__)


ACCEPTED_DOCUMENT_TYPES = [doc_type.value for doc_type in DocumentType]
ACCEPTED_LANGUAGES = [language.value for language in Language]


def validate_input(document_type: str, language: str):
    """
    Validate the input document type and language.
    """
    if document_type not in ACCEPTED_DOCUMENT_TYPES:
        logger.error(f"Unsupported document type: {document_type}")
        raise HTTPException(status_code=400, detail="Unsupported document type.")

    if language not in ACCEPTED_LANGUAGES:
        logger.error(f"Unsupported language: {language}")
        raise HTTPException(status_code=400, detail="Unsupported language.")
