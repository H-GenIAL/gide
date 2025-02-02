import os
import pdfplumber

def get_first_pdf(directory=None):
    if directory is None:
        directory = os.getcwd()  # Utiliser le répertoire actuel si aucun n'est spécifié
    
    for file in os.listdir(directory):
        if file.lower().endswith(".pdf"):
            return os.path.join(directory, file)  # Retourne le chemin complet du premier PDF trouvé
    
    return None  # Aucun fichier PDF trouvé

def convert_to_md(file_path):
    """
    Convertit un fichier en format Markdown (.md).

    Arguments:  
    file_path : str -- Chemin du fichier à convertir.

    Returns:
    None
    """
    md_content = ""

    print(file_path)
    if file_path.endswith('.pdf'):
        # Traitement du PDF
        with pdfplumber.open(file_path) as pdf:
            for page in pdf.pages:
                text = page.extract_text()
                if text:
                    md_content += text + "\n\n"  # Ajoute une nouvelle ligne entre les pages
        file_path_md = file_path.replace('.pdf', '.md')

    else:
        raise ValueError("File format unsupported.")

    print(file_path_md + "test!")
    # Écriture dans le fichier Markdown
    with open(file_path_md, 'w', encoding='utf-8') as md_file:
        md_file.write(md_content)

    # Supprime le fichier initial pour le stockage
    #os.remove(file_path)

def process_pdf(directory=None):
    print("find pdf...")
    pdf_path = get_first_pdf(directory)

    if pdf_path:
        print("📄 Premier PDF trouvé :", pdf_path)
        print("convert to md...")
        convert_to_md(pdf_path)
        print('done')
    else:
        print("❌ Aucun PDF trouvé dans le répertoire actuel.")

    


