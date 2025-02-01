from dataclasses import dataclass
from typing import Dict


@dataclass
class DataPoint:
    id: str
    unit: int
    name: str
    type: str
    top_k: int
    bm25_query: str
    semantic_query: str
    retriever_strategy: Dict[str, int]
    generator_query: str
    generator_instruction: str
    generator_conf: Dict[str, float]
