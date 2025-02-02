from dataclasses import dataclass
from typing import Any, List

from gide_rag.shared.entities import Chunk
from gide_rag.shared.entities.datapoint import DataPoint


@dataclass
class ExtractedData:
    datapoint: DataPoint
    output: Any
    confidence: float
    relevant_chunks: List[Chunk]

    def to_dict(self):
        return {
            "datapoint": self.datapoint.id,
            "value": self.output.to_dict(),
            "confidence": self.confidence,
            "relevant_chunks": [x.__dict__ for x in self.relevant_chunks],
        }
