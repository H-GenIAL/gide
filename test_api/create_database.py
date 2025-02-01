import os
import json
import numpy as np
import faiss  # Ajout de FAISS pour stockage des vecteurs
import boto3
import tiktoken

class MarkdownVectorizer:
    def __init__(self, model_emb="amazon.titan-embed-text-v2:0", region="us-west-2"):
        self.model_emb = model_emb
        self.bedrock_runtime = boto3.client("bedrock-runtime", region_name=region)
        self.faiss_index_path = "faiss_index.bin"  # Fichier pour stocker FAISS

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
                modelId=self.model_emb,
                contentType="application/json",
                accept="application/json",
                body=json.dumps({"inputText": chunk})
            )
            embedding = json.loads(response["body"].read())["embedding"]
            vectors.append(embedding)
        
        # Convertir la liste en tableau NumPy 2D
        return np.array(vectors, dtype=np.float32)

    def reset_faiss_index(self, dimension):
        """Supprime l'ancienne base FAISS et crée un nouvel index."""
        if os.path.exists(self.faiss_index_path):
            os.remove(self.faiss_index_path)  # 🔴 Supprime l'ancien fichier FAISS
            print("🗑️ Ancienne base FAISS supprimée.")

        index = faiss.IndexFlatL2(dimension)  # Distance Euclidienne
        faiss.write_index(index, self.faiss_index_path)  # Sauvegarde après reset
        print("🔄 FAISS index réinitialisé et stocké en dur.")
        return index

    def load_or_create_faiss_index(self, dimension):
        """Charge l'index FAISS s'il existe, sinon en crée un nouveau."""
        if os.path.exists(self.faiss_index_path):
            index = faiss.read_index(self.faiss_index_path)
            print("✅ FAISS index chargé depuis le disque.")
        else:
            index = self.reset_faiss_index(dimension)
        return index

    def process(self):
        """Exécute toutes les étapes : trouver, charger, découper, vectoriser, et stocker dans FAISS."""
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

        # 🔄 Suppression et réinitialisation de FAISS avant de stocker de nouveaux vecteurs
        dimension = vectors.shape[1]
        index = self.reset_faiss_index(dimension)

        # 📌 Ajouter les vecteurs dans FAISS et sauvegarder
        index.add(vectors)
        faiss.write_index(index, self.faiss_index_path)
        print("✅ FAISS index mis à jour et stocké en dur !")

        return chunks, vectors

if __name__ == "__main__":
    vectorizer = MarkdownVectorizer()
    vectorizer.process()