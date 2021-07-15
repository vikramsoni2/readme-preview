define(['exports', './showdown', 'jquery'], function (exports, showdown, $) {

    converter = new showdown.Converter()

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function drawHtml(markdown){

        var html = converter.makeHtml(markdown)

        div = document.createElement('div')
        div.style.cssText="padding:20px; border:1px solid #ddd; border-radius:5px; background: #fcfcfc;"
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

            console.log(url)

            fetch(url, opts).then(function (response) {
                return response.json();
            })
            .then(function (body) {
                drawHtml(body.content)
            });

        }
    }

    

    function load_ipython_extension() {

        showReadMe()

    }


    exports.load_ipython_extension = load_ipython_extension;
});

