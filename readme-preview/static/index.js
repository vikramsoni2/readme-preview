define(['exports', 'base/js/events', 'base/js/namespace', './showdown'], function (exports, events, Jupyter, showdown) {

    converter = new showdown.Converter()

    converter.setFlavor('github');
    converter.setOption('simpleLineBreaks', true)
    converter.setOption('tasklists', true)
    converter.setOption('tables', true)
    converter.setOption('openLinksInNewWindow', true)

    Object.defineProperty(exports, "__esModule", {
        value: true
    });


    function addStyle(){
    
        const style = document.createElement('style');
        // add CSS styles
        style.innerHTML = `
            #div_readme {
                padding:20px; 
                border:1px solid #ddd; 
                border-radius:5px; 
                background: #fcfcfc;
            }
            #div_readme p {
                margin: 2rem 0 1rem 0;
            }
        `;

        // append the style to the DOM in <head> section
        document.head.appendChild(style);

    }

    function drawHtml(markdown){

        var html = converter.makeHtml(markdown)

        div = document.createElement('div')
        div.setAttribute("id", "div_readme");

        div.innerHTML = "<h5 style='font-weight:bold'>README.md</h5><hr/>"
        div.innerHTML += html
        document.querySelector('#notebooks').appendChild(div)
    }

    function showReadMe(){
        var opts = {
            method: 'GET',      
            headers: {'Content-Type':'application/json'}
        };
        
        base_url = Jupyter.notebook_list.base_url
        model_path = Jupyter.notebook_list.model_list.path
        models = Jupyter.notebook_list.model_list.content.filter(model=>model.name=='README.md')

        if(models.length > 0){

            var rest_url = base_url + "api/contents/"+ model_path +"/README.md?type=file&format=text"

            rest_url = rest_url.replace("//","/")

            fetch(rest_url, opts).then(function (response) {
                return response.json();
            })
            .then(function (body) {
                drawHtml(body.content)
            });

        }
    }

    

    function load_ipython_extension() {
        addStyle()
        showReadMe()

        events.on("draw_notebook_list.NotebookList", function() {

            if (document.contains(document.getElementById("div_readme"))) {
                document.getElementById("div_readme").remove();
            }
            
            showReadMe()                           
        })

    }


    exports.load_ipython_extension = load_ipython_extension;
});

