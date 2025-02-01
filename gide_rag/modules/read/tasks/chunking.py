from langchain_text_splitters import RecursiveCharacterTextSplitter
from pdf2image import convert_from_path
import base64
import io


class TextSplitter:
    chunk_size = 1000
    chunk_overlap = 200

    def __init__(self):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=self.chunk_size, chunk_overlap=self.chunk_overlap
        )

    def split_documents(this, docs):
        """return splitts of documents"""
        return this.splitter.split_documents(docs)


class ImageSpitter:
    def __init__(self):

        return

    def split_by_page(self, document):
        pages = convert_from_path(document.filepath)
        pages_base64 = []

        for page_num, page in enumerate(pages):
            # Convert PIL Image to bytes in memory
            img_buffer = io.BytesIO()
            page.save(img_buffer, format="PNG")
            img_buffer.seek(0)

            # Encode the image in base64
            img_base64 = base64.b64encode(img_buffer.read()).decode("utf-8")
            pages_base64.append(
                {
                    "page": page_num,
                    "base64": img_base64,
                    "source": document.filename,
                }
            )

        return pages_base64
