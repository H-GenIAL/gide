from dataclasses import dataclass
import json
from typing import Dict, Tuple


@dataclass
class Output:
    raw: str
    parsed: Dict[str, str] = None
    location: Tuple = (0, 0, 0, 0)

    def __post_init__(self):
        raw_input = self.raw
        try:
            parsed_output = (
                raw_input.replace("\n", "").replace("```json", "").replace("`", "")
            )
            output = json.loads(parsed_output)
            self.parsed = list(output.values())[0]
        except (AttributeError, ValueError):
            self.parsed = "nan"

    def to_dict(self):
        return {"raw": self.raw, "parsed": self.parsed, "location": self.location}
