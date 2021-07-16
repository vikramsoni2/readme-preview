def _jupyter_server_extension_paths():
    return [{
        "module": "readme-preview"
    }]

# Jupyter Extension points
def _jupyter_nbextension_paths():
    return [{
        'section': 'tree',
        'src': 'static',
        'dest': 'readme-preview',
        'require': 'readme-preview/index'
    }]

def load_jupyter_server_extension(nbapp):
    nbapp.log.info("readme-preview extension loaded!")