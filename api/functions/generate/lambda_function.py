import json
import base64
import faiss
from io import BytesIO
from main import process_function, query_iterate

# 🔹 Chemin vers la base FAISS
FAISS_INDEX_PATH = "faiss_index.bin"

def lambda_handler(event, context):
    """
    Lambda function to generate structured data from an uploaded PDF.

    Args:
        event (dict): The event object containing the request data.
        context (dict): The context object containing the runtime information.
    """
    try:
        # Extract the PDF content from the multipart/form-data request
        if 'body' not in event:
            raise ValueError("No body found in the request")

        # If the body is a string (which is common with API Gateway), parse it
        if isinstance(event['body'], str):
            # Check if the body is base64 encoded (API Gateway setting)
            if event.get('isBase64Encoded', False):
                pdf_content = base64.b64decode(event['body'])
            else:
                pdf_content = event['body']
        else:
            pdf_content = event['body']

        pdf_file = BytesIO(pdf_content)
        chunks, vectors = process_function(pdf_file)
        index = faiss.read_index(FAISS_INDEX_PATH)
        answers_dict = query_iterate(index, chunks)
        json_data = json.dumps(answers_dict)

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json_data
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'message': f'Error: {str(e)}'
            })
        }

if __name__ == "__main__":
    with open("./data/input.pdf", "rb") as file:
        pdf_content = file.read()

    lambda_handler({
        'body': pdf_content,
        'isBase64Encoded': True
    }, None)
