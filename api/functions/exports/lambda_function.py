import boto3
import json
from docx import Document
import argparse
import sys
from pathlib import Path
from io import BytesIO
import base64

"""
Mapping the types of the cells in the template to the data in the YAML file
to be used in the yaml-to-word.py script to replace the template keys with the data
"""
cell_mapping = {
    "bailleur": {
        "type": "text"
    },
    "preneur": {
        "type": "text"
    },
    "cession": {
        "type": "yesno"
    },
    "cession_raison": {
        "type": "text"
    },
    "adresse": {
        "type": "text"
    },
    "designation": {
        "type": "yesno"
    }
}

def iterate_over_unique_cells(table, func):
    """
    Iterate over all unique cells in a table (ignoring merged/extended cells)
    """
    # Get unique cells (ignoring merged/extended cells)
    cells = set(cell for row in table.rows for cell in row.cells)
    for cell in cells:
        func(cell)

def load_json(file_path):
    """Load and parse JSON file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            return json.load(file)
    except Exception as e:
        print(f"Error loading JSON file: {e}")
        sys.exit(1)

def replace_key_with_value(key, value):
    """Create a callback function to replace template keys with values in Word doc cells."""
    if key not in cell_mapping:
        return None
    
    type = cell_mapping[key]['type']
    
    if type == "yesno":
        def callback(cell):
            for paragraph in cell.paragraphs:
                for run in paragraph.runs:
                    if f"${key}-yes" in run.text:
                        run.text = "☑" if value == "Yes" else "☐"
                    elif f"${key}-no" in run.text:
                        run.text = "☐" if value == "Yes" else "☑"
        return callback

    # text, number, etc.
    else:
        def callback(cell):
            for paragraph in cell.paragraphs:
                for run in paragraph.runs:
                    if f"${key}" in run.text:
                        run.text = value
        return callback

def export_to_word_base64(data, template_path):
    doc = Document(template_path)
    table = doc.tables[0]
    for key, value in data.items():
        # Iterate over all unique cells in the table and replace the key with the value
        iterate_over_unique_cells(table, replace_key_with_value(key, value))
    doc_buffer = BytesIO()
    doc.save(doc_buffer)
    doc_buffer.seek(0)
    
    # Convert the document to base64
    base64_doc = base64.b64encode(doc_buffer.getvalue()).decode('utf-8')
    return base64_doc

def lambda_handler(event, context):
    s3_client = boto3.client('s3')
    
    try:
        # Get the bucket name and object key
        bucket_name = 'apigide-exports'
        object_key = 'template.docx'
        
        # Get the object from S3
        response = s3_client.get_object(
            Bucket=bucket_name,
            Key=object_key
        )
        
        # Read the content
        template_doc_content = response['Body'].read()
        template_doc_buffer = BytesIO(template_doc_content)

        output_doc_base64 = export_to_word_base64(event, template_doc_buffer)
        
        return {
            'statusCode': 200,
            'body': output_doc_base64
        }
    
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': f'Error: {str(e)}'
            })
        }
