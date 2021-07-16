define(['exports', 'base/js/events', './showdown'], function (exports, events, showdown) {

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

        div.innerHTML = "<h4 style='font-weight:bold'>README.md</h4><hr/>"
        div.innerHTML += html
        document.querySelector('#notebooks').appendChild(div)
    }

    function showReadMe(){
        var opts = {
            method: 'GET',      
            headers: {'Content-Type':'application/json'}
        };

        var rows = Array.prototype.concat.apply([], document.querySelectorAll('.list_item.row'));
        var row = rows.filter(row=>row.querySelector('.item_name').innerText=='README.md')

        if(row.length > 0){

            var url = row[0].querySelector('.item_link').href.replace(/^.*\/\/[^\/]+/, '')
            url = "/api/contents/"+ url.split("/").splice(2).join("/")+"?type=file&format=text"

            fetch(url, opts).then(function (response) {
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

