import logging
from typing import List

from gide_rag.modules.read.tasks.chunking import TextSplitter, ImageSpitter
from gide_rag.shared.entities import Chunk
from gide_rag.shared.entities.context import Document
from gide_rag.shared.constants.chunking_types import ChunkType

logger = logging.getLogger(__name__)

__all__ = ["parse_document"]


def localize_chunks(x):
    return "(0,0,0,0)"


def parse_document(document: Document, chunk_type: ChunkType) -> List[Chunk]:
    """
    Parse a document into chunks

    Args:
        document (Document): Document object to be parsed

    Returns:
        List[Chunk]: List of Chunk objects with the parsed chunks
    """

    img_per_page = ImageSpitter().split_by_page(document)

    output = None
    try:
        logger.info("Parsing the document...")
        docs = document.loader.load()
        for doc in docs:
            doc.metadata["source"] = document.filename
            doc.metadata["bbox"] = localize_chunks(doc.page_content)
        if chunk_type == ChunkType.PAGE:
            output = docs
        elif chunk_type == ChunkType.RECURSIVE_CHARACTER_TEXT_SPLITTER:
            chunks = TextSplitter().split_documents(docs)
            output = chunks
        logger.info(f"Document parsed successfully with {len(output)} chunks.")
    except Exception as e:
        raise RuntimeError(f"Error parsing document: {e}")

    result = {"text": output, "image": img_per_page}
    return result
