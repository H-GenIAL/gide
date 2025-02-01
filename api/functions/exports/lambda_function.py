import boto3
import json
from forms.lease.json_to_word import export_to_word_base64

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
        template_doc_buffer = io.BytesIO(template_doc_content)

        output_doc_base64 = export_to_word_base64(event, template_doc_buffer);
        
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
