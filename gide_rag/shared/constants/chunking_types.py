from enum import Enum


class ChunkType(str, Enum):
    PAGE = "page"
    RECURSIVE_CHARACTER_TEXT_SPLITTER = "rcts"
    LAYOUT_PARSER = "layout_parser"
