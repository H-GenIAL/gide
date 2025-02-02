import pytest

from doc_assistant.pipelines import EPCPipeline
from doc_assistant.shared.constants import DocumentType
from doc_assistant.shared.constants.languages import Language
from doc_assistant.shared.constants.path import TEST_DATA_DIR
from doc_assistant.shared.entities import Context, Document


@pytest.fixture(scope="module")
def extracted_data():
    test_file = "energy_performance_certificate_example.pdf"
    filepath = TEST_DATA_DIR / test_file
    epc_doc = Document(filepath=filepath, language=Language.EN)
    context = Context(
        document=epc_doc,
        document_type=DocumentType.ENERGY_PERFORMANCE_CERTIFICATE,
    )

    return EPCPipeline(context).run()


@pytest.mark.parametrize(
    "data_point_id, expected_value",
    [
        ("address", "17 Any Street, District, Any Town, B5 5XX"),
        ("total_floor_area_m2", "165"),
        ("date_of_certificate", "13 March 2012"),
        ("type_of_assessment", "RdSAP, existing dwelling"),
        ("assessor_name", "John Smith"),
        # TODO: Add more data points as needed
    ],
)
def test_epc_pipeline_end_to_end(extracted_data, data_point_id, expected_value):
    """
    End-to-end test for the Energy Performance Certificate (EPC) pipeline.
    This test checks the full workflow of reading a document, retrieving data,
    and extracting specific data points.
    """

    assert (
        data_point_id in extracted_data
    ), f"{data_point_id} was not found in the extracted data."
    assert (
        expected_value in extracted_data[data_point_id].value
    ), f"Expected {data_point_id}: {expected_value}, but got: {extracted_data[data_point_id].value}"
