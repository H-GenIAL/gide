import os
import json
import numpy as np
import faiss  # Ajout de FAISS pour stockage des vecteurs
import boto3
import tiktoken
import nltk
nltk.download("punkt")
from nltk.tokenize import sent_tokenize

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
        
        print("❌ Aucun fichier Markdown trouvé dans le répertoire.")
        return None  # Aucun fichier Markdown trouvé

    def load_markdown(self, md_file):
        """Charge le contenu d'un fichier Markdown dans une variable string."""
        with open(md_file, "r", encoding="utf-8") as file:
            return file.read()

    def split_text(self, text, chunk_size=500, overlap=100):
        """Découpe un texte en chunks, d'abord par paragraphes, puis par phrases si nécessaire."""
        
        encoding = tiktoken.get_encoding("cl100k_base")
        paragraphs = text.split("\n\n")  # Séparer par paragraphes

        chunks = []
        current_chunk = []
        current_length = 0

        for para in paragraphs:
            tokenized_para = encoding.encode(para)
            
            # Si le paragraphe tient dans un chunk, on l'ajoute directement
            if len(tokenized_para) <= chunk_size:
                if current_length + len(tokenized_para) > chunk_size:
                    # Sauvegarde le chunk précédent
                    chunks.append(encoding.decode(sum(current_chunk, [])))
                    current_chunk = []
                    current_length = 0

                current_chunk.append(tokenized_para)
                current_length += len(tokenized_para)
            else:
                # Si le paragraphe est trop long, on le découpe en phrases
                sentences = sent_tokenize(para)
                for sentence in sentences:
                    tokenized_sentence = encoding.encode(sentence)
                    sentence_length = len(tokenized_sentence)

                    if current_length + sentence_length > chunk_size:
                        chunks.append(encoding.decode(sum(current_chunk, [])))

                        # Overlap avec les derniers tokens du chunk précédent
                        if chunks and overlap > 0:
                            overlap_tokens = encoding.encode(" ".join(chunks[-1].split()[-overlap:]))
                            current_chunk = [overlap_tokens]
                            current_length = len(overlap_tokens)
                        else:
                            current_chunk = []
                            current_length = 0

                    current_chunk.append(tokenized_sentence)
                    current_length += sentence_length

        if current_chunk:
            chunks.append(encoding.decode(sum(current_chunk, [])))

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

    def process(self, md_content):
        """Exécute toutes les étapes : trouver, charger, découper, vectoriser, et stocker dans FAISS."""
       
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