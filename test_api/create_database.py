import os
import json
import numpy as np
import boto3
import tiktoken

class MarkdownVectorizer:
    def __init__(self, model_id="amazon.titan-embed-text-v2:0", region="us-west-2"):
        self.model_id = model_id
        self.bedrock_runtime = boto3.client("bedrock-runtime", region_name=region)

    def find_first_md_file(self, directory=None):
        """Trouve le premier fichier .md dans le répertoire donné (ou actuel par défaut)."""
        if directory is None:
            directory = os.getcwd()
        
        for file in os.listdir(directory):
            if file.lower().endswith(".md"):
                return os.path.join(directory, file)
        
        return None  # Aucun fichier Markdown trouvé

    def load_markdown(self, md_file):
        """Charge le contenu d'un fichier Markdown dans une variable string."""
        with open(md_file, "r", encoding="utf-8") as file:
            return file.read()

    def split_text(self, text, chunk_size=500, overlap=100):
        """Découpe le texte en morceaux (chunks) avec overlap."""
        encoding = tiktoken.get_encoding("cl100k_base")
        tokens = encoding.encode(text)
        
        chunks = []
        for i in range(0, len(tokens), chunk_size - overlap):
            chunk = tokens[i : i + chunk_size]
            chunks.append(encoding.decode(chunk))
        
        return chunks

    def vectorize_chunks(self, chunks):
        """Transforme chaque chunk en vecteur d'embedding via Amazon Bedrock."""
        vectors = []
        
        for chunk in chunks:
            response = self.bedrock_runtime.invoke_model(
                modelId=self.model_id,
                contentType="application/json",
                accept="application/json",
                body=json.dumps({"inputText": chunk})
            )
            embedding = json.loads(response["body"].read())["embedding"]
            vectors.append(embedding)
        
        # Convertir la liste en tableau NumPy 2D
        return np.array(vectors, dtype=np.float32)

    def process(self):
        """Exécute toutes les étapes : trouver, charger, découper, vectoriser."""
        md_file = self.find_first_md_file()
        if not md_file:
            print("❌ Aucun fichier Markdown trouvé dans le répertoire.")
            return None, None

        print(f"📄 Fichier Markdown trouvé : {md_file}")

        md_content = self.load_markdown(md_file)
        print(f"🔹 Aperçu du texte :\n{md_content[:400]}...\n")

        chunks = self.split_text(md_content)
        print(f"✅ {len(chunks)} chunks générés.")

        vectors = self.vectorize_chunks(chunks)
        print("✅ Vectorisation terminée !")
        print("📊 Shape of vectors array:", vectors.shape)

        return md_file, vectors

if __name__ == "__main__":
    vectorizer = MarkdownVectorizer()
    vectorizer.process()


