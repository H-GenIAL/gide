import logging
import os
import tempfile

from fastapi import APIRouter, File, Form, HTTPException, UploadFile
from fastapi.responses import JSONResponse

from api.input import validate_input
from gide_rag.pipelines.factory import get_pipeline
from gide_rag.shared.entities.context import Context, Document
from gide_rag.shared.constants.languages import Language
from gide_rag.shared.constants import DocumentType

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/")
def read_root():
    """
    Health check endpoint to verify that the API is running.
    """
    return {"message": "Document Extraction API is running."}


@router.post("/extract/")
async def extract_data(
    document_type: str = Form(...),
    language: str = Form(...),
    file: UploadFile = File(...),
):
    """
    API endpoint to extract data from a document.

    Args:
        document_type (str): Type of the document (e.g., 'bail_immo').
        language (str): Language of the document (e.g., 'en', 'fr').
        file (UploadFile): The uploaded document file (PDF).

    Returns:
        JSONResponse: The extracted data points from the document.
    """

    validate_input(document_type, language)

    file_path = None
    try:
        # Save the uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as temp_file:
            temp_file.write(await file.read())
            file_path = temp_file.name
            logger.info(f"File saved at {file_path}")

        language = Language(language)
        document_type = DocumentType(document_type)

        # Create the document and context
        document = Document(filepath=file_path, language=language)
        doc_context = Context(document=document, document_type=document_type)
        pipeline = get_pipeline(doc_context)

        # Run the pipeline and collect the result
        result = pipeline.run()
        result_dict = {
            datapoint_key: data.to_dict() for datapoint_key, data in result.items()
        }

        return JSONResponse(content={"status": "success", "data": result_dict})

    except Exception as e:
        logger.error(f"Failed to process document: {e}")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Ensure file is removed regardless of success or failure
        if file_path and os.path.exists(file_path):
            os.remove(file_path)
            logger.info(f"Temporary file {file_path} deleted.")
