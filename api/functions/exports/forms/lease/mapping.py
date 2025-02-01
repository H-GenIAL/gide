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

