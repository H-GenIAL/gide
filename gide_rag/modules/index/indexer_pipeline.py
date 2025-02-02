import chromadb
from gide_rag.shared.constants.path import (
    CHROMA_PATH,
    CHROMA_PORT,
    CHROMA_HOST,
    CHROMA_TEXT_COLLECTION,
    CHROMA_IMAGE_COLLECTION,
)
from llm.open_ai.client import Open_AI
from dotenv import load_dotenv
import os
import uuid
import logging

logger = logging.getLogger(__name__)

load_dotenv()
CHROMA_MODE = os.getenv("CHROMA_MODE")
OPENAI_CIENT = Open_AI()


class Indexer:
    def __init__(self, mode=CHROMA_MODE):
        if mode == "local":
            self.chroma_client = chromadb.PersistentClient(str(CHROMA_PATH))
        elif mode == "server":
            self.chroma_client = chromadb.HttpClient(host=CHROMA_HOST, port=CHROMA_PORT)

    def add_to_collection(self, collection, file_data, batch_size):
        for i in range(0, len(file_data["ids"]), batch_size):
            collection.add(
                documents=file_data["documents"][i : i + batch_size],
                embeddings=file_data["embeddings"][i : i + batch_size],
                metadatas=file_data["metadatas"][i : i + batch_size],
                ids=file_data["ids"][i : i + batch_size],
            )
        return

    def index_text(self, chunks, document_type, batch_size=5):
        logger.info("Indexing textual chunks...")
        collection = self.chroma_client.get_or_create_collection(
            name=CHROMA_TEXT_COLLECTION.format(document_type.value.upper()),
            metadata={"hnsw:space": "cosine"},
        )
        file_data = {
            "embeddings": [OPENAI_CIENT.embedding(x.page_content) for x in chunks],
            "documents": [x.page_content for x in chunks],
            "metadatas": [x.metadata for x in chunks],
            "ids": [f"{uuid.uuid4()}" for _ in range(len(chunks))],
        }
        _ = self.add_to_collection(collection, file_data, batch_size)
        logger.info(
            f"{len(file_data['ids'])} textual chunks have been successfully indexed."
        )

    def index_image(self, pages_base64, document_type, batch_size=5):
        logger.info("Indexing image chunks...")
        collection = self.chroma_client.get_or_create_collection(
            name=CHROMA_IMAGE_COLLECTION.format(document_type.value.upper())
        )
        file_data = {
            "embeddings": [[0] for i in range(len(pages_base64))],  # no embeddings
            "documents": [x["base64"] for x in pages_base64],
            "metadatas": [
                {"page": x["page"], "source": x["source"]} for x in pages_base64
            ],
            "ids": [f"{uuid.uuid4()}" for _ in range(len(pages_base64))],
        }
        _ = self.add_to_collection(collection, file_data, batch_size)
        logger.info(
            f"{len(file_data['ids'])} image chunks have been successfully indexed."
        )
