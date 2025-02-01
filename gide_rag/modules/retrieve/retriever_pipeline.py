import chromadb
from gide_rag.shared.entities.datapoint import DataPoint
from gide_rag.shared.constants.path import (
    CHROMA_PATH,
    CHROMA_PORT,
    CHROMA_HOST,
    CHROMA_TEXT_COLLECTION,
    CHROMA_IMAGE_COLLECTION,
)
from gide_rag.shared.entities.chunk import Chunk
from rank_bm25 import BM25Okapi
from nltk.tokenize import word_tokenize

from gide_rag.modules.index.indexer_pipeline import OPENAI_CIENT
from gide_rag.shared.constants.datapoint_types import DatapointType
from dotenv import load_dotenv
import os
import logging
from collections import defaultdict

logger = logging.getLogger(__name__)

load_dotenv()
CHROMA_MODE = os.getenv("CHROMA_MODE")


class Retriever:
    def __init__(self, mode=CHROMA_MODE):
        if mode == "local":
            self.chroma_client = chromadb.PersistentClient(str(CHROMA_PATH))
        elif mode == "server":
            self.chroma_client = chromadb.HttpClient(host=CHROMA_HOST, port=CHROMA_PORT)
        self.rrf_k = 60

    def _count_doc_nb_chunks(self, collection, filename):
        results = collection.get(where={"source": filename})
        n = len(results["ids"])
        return n

    def _assign_rank(self, chunks_list):
        for rank, chunk in enumerate(chunks_list, start=1):
            chunk["rank"] = rank
            chunk["id"] = chunk.id
        return chunks_list

    def semantic_retrieval(self, datapoint, collection, filename, top_k):
        query_vector = OPENAI_CIENT.embedding(datapoint.semantic_query)
        top_chunks = collection.query(
            query_embeddings=query_vector,
            n_results=top_k,
            where={"source": filename},
        )

        chunks_list = [
            Chunk(
                page_content=top_chunks["documents"][0][i],
                metadata={
                    **top_chunks["metadatas"][0][i],
                    "similarity": 1 - top_chunks["distances"][0][i],
                },
                id=top_chunks["ids"][0][i],
            )
            for i in range(len(top_chunks["documents"][0]))
        ]
        chunks_list = sorted(
            chunks_list, key=lambda x: x.metadata["similarity"], reverse=True
        )

        return chunks_list

    def bm25_retrieval(self, datapoint, collection, filename, top_k):
        tokenized_query = word_tokenize(datapoint.bm25_query)
        all_retrieved_chunks = collection.get(where={"source": filename})
        tokenized_corpus = [
            word_tokenize(doc) for doc in all_retrieved_chunks["documents"]
        ]
        bm25 = BM25Okapi(tokenized_corpus, k1=1.2, b=0.75)

        res = bm25.get_scores(tokenized_query)

        chunks_list = [
            Chunk(
                page_content=all_retrieved_chunks["documents"][i],
                metadata={
                    **all_retrieved_chunks["metadatas"][i],
                    "similarity": res[i],
                },
                id=all_retrieved_chunks["ids"][i],
            )
            for i in range(len(all_retrieved_chunks["documents"]))
        ]
        chunks_list = sorted(
            chunks_list, key=lambda x: x.metadata["similarity"], reverse=True
        )[:top_k]
        return chunks_list

    def rrf_retrieval(self, datapoint, collection, filename, top_k):
        def assign_ranks(chunks_list):
            return {
                chunk.id: rank + 1
                for rank, chunk in enumerate(
                    sorted(
                        chunks_list,
                        key=lambda x: x.metadata["similarity"],
                        reverse=True,
                    )
                )
            }

        n = self._count_doc_nb_chunks(collection, filename)

        # Get bm25 Rank
        bm25_chunk_list = self.bm25_retrieval(datapoint, collection, filename, n)
        bm25_ranks = assign_ranks(bm25_chunk_list)

        # Get Semantic Rank
        semantic_chunk_list = self.semantic_retrieval(
            datapoint, collection, filename, n
        )
        semantic_ranks = assign_ranks(semantic_chunk_list)

        # Compute RRF
        rrf_scores = defaultdict(float)
        all_ids = set(bm25_ranks.keys()).union(set(semantic_ranks.keys()))

        for chunk_id in all_ids:
            r1 = bm25_ranks.get(chunk_id, float("inf"))
            r2 = semantic_ranks.get(chunk_id, float("inf"))
            rrf_scores[chunk_id] = 1 / (self.rrf_k + r1) + 1 / (self.rrf_k + r2)

        fused_chunks = []
        for chunk_id in rrf_scores:
            chunk = next(
                (c for c in bm25_chunk_list + semantic_chunk_list if c.id == chunk_id),
                None,
            )
            if chunk:
                fused_chunk = Chunk(
                    page_content=chunk.page_content,
                    metadata={**chunk.metadata, "similarity": rrf_scores[chunk_id]},
                    id=chunk.id,
                )
                fused_chunks.append(fused_chunk)

        rrf_chunks_list = sorted(
            fused_chunks, key=lambda x: x.metadata["similarity"], reverse=True
        )[:top_k]

        return rrf_chunks_list

    def img_retrieval(self, img_collection, chunks_list, filename):

        lst_pages = list(dict.fromkeys([x.metadata["page"] for x in chunks_list]))

        top_img_chunks = img_collection.get(
            where={
                "$and": [
                    {"source": filename},
                    {"page": {"$in": lst_pages}},
                ]
            }
        )
        chunks_list = [
            Chunk(
                page_content=top_img_chunks["documents"][i],
                metadata=top_img_chunks["metadatas"][i],
                id=top_img_chunks["ids"][i],
            )
            for i in range(len(top_img_chunks["documents"]))
        ]
        chunks_list = sorted(
            chunks_list, key=lambda x: lst_pages.index(x.metadata["page"])
        )

        return chunks_list

    def get_top_chunks(self, filename: str, datapoint: DataPoint, document_type):
        strategy = datapoint.retriever_strategy
        top_k = datapoint.top_k
        dp_type = datapoint.type

        # Chroma text collection
        text_collection = self.chroma_client.get_or_create_collection(
            name=CHROMA_TEXT_COLLECTION.format(document_type.value.upper()),
            metadata={"hnsw:space": "cosine"},
        )

        # Chroma image collection
        img_collection = self.chroma_client.get_or_create_collection(
            name=CHROMA_IMAGE_COLLECTION.format(document_type.value.upper())
        )

        chunks_list = []

        # Semantic search
        if strategy["semantic"] and not strategy["bm25"]:
            logger.info(f"Semantic retrieval for datapoint {datapoint.id}")
            chunks_list = self.semantic_retrieval(
                datapoint, text_collection, filename, top_k
            )
            logger.info(f"Successfully retrieved {len(chunks_list)} semantic chunks")

        # bm25 search
        elif strategy["bm25"] and not strategy["semantic"]:
            logger.info(f"BM25 retrieval for datapoint {datapoint.id}")
            chunks_list = self.bm25_retrieval(
                datapoint, text_collection, filename, top_k
            )
            logger.info(f"Successfully retrieved {len(chunks_list)} bm25 chunks")

        # RRF
        elif strategy["semantic"] and strategy["bm25"]:
            logger.info(f"RRF retrieval for datapoint {datapoint.id}")
            chunks_list = self.rrf_retrieval(
                datapoint, text_collection, filename, top_k
            )
            logger.info(f"Successfully retrieved {len(chunks_list)} RRF chunks")

        else:
            raise ValueError(f"Invalid strategy: {strategy}")

        ## If datapoint type is image return image base64 content of each page
        if dp_type == DatapointType.IMAGE:
            logger.info(f"Image retrieval for datapoint {datapoint.id}")
            chunks_list = self.img_retrieval(img_collection, chunks_list, filename)
            logger.info(f"Successfully retrieved {len(chunks_list)} images")

        return chunks_list
