import json
import base64
import faiss
from io import BytesIO
from main import process_function, query_iterate

# 🔹 Chemin vers la base FAISS
FAISS_INDEX_PATH = "faiss_index.bin"

def parse_multipart_form(body, boundary):
    """Parse multipart form data to extract PDF content"""
    parts = body.split(b'--' + boundary)
    for part in parts:
        if b'Content-Type: application/pdf' in part:
            # Find the PDF content after headers (separated by two newlines)
            pdf_content = part.split(b'\r\n\r\n')[1].strip()
            return pdf_content
    return None

def lambda_handler(event, context):
    """
    Lambda function to generate structured data from an uploaded PDF.

    Args:
        event (dict): The event object containing the request data.
        context (dict): The context object containing the runtime information.
    """
    try:
        if 'body' not in event:
            raise ValueError("No body found in the request")

        # Handle multipart/form-data
        content_type = event.get('headers', {}).get('content-type', '')
        if 'multipart/form-data' in content_type:
            # Extract boundary from content-type
            boundary = content_type.split('boundary=')[1].encode()
            
            # Decode body if it's base64 encoded
            body = base64.b64decode(event['body']) if event.get('isBase64Encoded', False) else event['body'].encode()
            pdf_content = parse_multipart_form(body, boundary)
            
            if pdf_content is None:
                raise ValueError("No PDF file found in form data")
        else:
            # Handle existing cases (direct PDF or base64)
            if isinstance(event['body'], str):
                pdf_content = base64.b64decode(event['body']) if event.get('isBase64Encoded', False) else event['body'].encode()
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
