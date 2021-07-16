# readme-preview

A Jupyter notebook extension to render README.md markdown files in the folder view. 
it loads the github style preview of README.md file if it exist in the current directory.

install python package  

    pip install readme-preview

Install the notebook extension  
  
    jupyter nbextension install --py readme-preview

emable the extension  

    jupyter nbextension enable --py readme-preview
    


#### TODO

* reload readme when directory changed

## References

https://github.com/showdownjs/showdown used for converting markdown to HTML for preview

