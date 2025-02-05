"""
Code qui permet de surligner un chunk choisi du texte dans un PDF.

"""

import fitz  # PyMuPDF
from pdf_processing import get_first_pdf
import tiktoken
from nltk.tokenize import sent_tokenize
import numpy as np


import fitz  # PyMuPDF
import numpy as np

def highlight_relevant_chunk(output_path, chunks_size, index=2):
    """
    Surligne une portion spécifique du texte dans un PDF et enregistre le fichier modifié.
    
    :param output_path: Chemin du fichier de sortie.
    :param chunks_size: Liste des tailles de morceaux de texte.
    :param index: Index du morceau à surligner.
    """
    pdf_path = get_first_pdf()
    doc = fitz.open(pdf_path)
    chunks_size = np.array(chunks_size, dtype=int)
    before_highlight = np.sum(chunks_size[:index])
    residual = 0
    
    for page_num, page in enumerate(doc):
        text = page.get_text("text")
        
        if before_highlight > len(text):
            before_highlight -= len(text)
            continue
        
        start_idx = before_highlight
        end_idx = min(start_idx + chunks_size[index], len(text))
        residual = max(0, chunks_size[index] - (end_idx - start_idx))
        highlight_text = text[start_idx:end_idx]
        
        # Surligner le texte trouvé sur la page
        for inst in page.search_for(highlight_text):
            page.add_highlight_annot(inst)
        
        # Surligner le résidu sur la page suivante si nécessaire
        if residual > 0 and page_num + 1 < len(doc):
            next_page = doc[page_num + 1]
            next_text = next_page.get_text("text")[:residual]
            for inst in next_page.search_for(next_text):
                next_page.add_highlight_annot(inst)
        
        break  # Deux pages sont modifiée au maximum, donc on sort de la boucle
    
    # Sauvegarde du fichier avec les surlignages
    doc.save(output_path)
    doc.close()
    print(f"Le fichier avec les surlignages a été sauvegardé sous : {output_path}")

def extract_text_from_pdf():
    """Extrait le texte de tout le PDF et le retourne sous forme de string."""
    pdf_path = get_first_pdf()
    doc = fitz.open(pdf_path)
    text = ""

    for page in doc:
        text += page.get_text("text") + "\n"

    doc.close()
    return text

def split_text(text, chunk_size=500, overlap=0):
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

def compute_chunks_size(chunks):
    """Calcule la taille de chaque chunk en nombre de tokens."""
    chunks_size = []
    for chunk in chunks:
        chunks_size.append(len(chunk))
    return chunks_size

# Exemple d'utilisation
chunks = split_text(extract_text_from_pdf())
chunks_size = compute_chunks_size(chunks)
output_pdf = "output_.pdf"  # Nom du fichier de sortie
index_relavant_chunk = 10  # Index du chunk à surligner

print(chunks[index_relavant_chunk])
highlight_relevant_chunk(output_pdf, chunks_size, index=index_relavant_chunk)