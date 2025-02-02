from gide_rag.modules.read.reader_pipeline import parse_document
from gide_rag.shared.constants import Language
from gide_rag.shared.constants.path import TEST_DATA_DIR
from gide_rag.shared.entities import Document


def test_parse_document():
    test_file = "bail_immobilier_test.pdf"
    filepath = TEST_DATA_DIR / test_file

    dummy_doc = Document(filepath=filepath, language=Language.fr)

    chunks = parse_document(dummy_doc)

    assert isinstance(chunks, list)
    assert len(chunks) > 0
    # TODO: Check the content of the chunks for correctness
