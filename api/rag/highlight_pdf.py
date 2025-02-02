import fitz  # PyMuPDF
import pdfplumber
from fuzzywuzzy import fuzz
from pdf_processing import get_first_pdf

def normalize_text(text):
    """ Nettoie et normalise le texte (minuscule, suppression des espaces inutiles) """
    return " ".join(text.lower().strip().split())

def highlight_text_in_pdf(retrieved_chunks, output_path="highlighted.pdf"):
    pdf_path = get_first_pdf()
    
    # Charger le PDF avec PyMuPDF
    doc = fitz.open(pdf_path)

    # Extraire le texte avec pdfplumber pour plus de précision
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(doc):
            text = pdf.pages[page_num].extract_text()
            if not text:
                continue  # Ignorer les pages vides

            normalized_text = normalize_text(text)

            for chunk in retrieved_chunks:
                chunk_text = normalize_text(chunk)

                # Comparaison fuzzy
                similarity = fuzz.partial_ratio(chunk_text, normalized_text)
                if similarity > 80:  # Seuil de 80%
                    print(f"🔍 Texte similaire trouvé à {similarity}% dans la page {page_num + 1}")

                    # Recherche des occurrences du chunk dans la page
                    text_instances = page.search_for(chunk)
                    for inst in text_instances:
                        page.add_highlight_annot(inst)

    # Sauvegarde du PDF avec surlignage
    doc.save(output_path)
    print(f"✅ Fichier PDF surligné enregistré : {output_path}")

