# main.py

import tiktoken
import boto3
import json
import faiss
import requests
import numpy as np
import os
from pdf_processing import pdf_process




def main_function():
    
    print("Process PDF...")
    pdf_process()
    print("Done")

    # Définir le chemin du fichier Markdown
    # split le md
    # vectorize
    # save faiiss
    # query - vectorize - knn 
    # context - prompt
    # réponse 
    # save réponse key - > value






if __name__ == "__main__":
    main_function()