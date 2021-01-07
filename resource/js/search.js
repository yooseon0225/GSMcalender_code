const Searching = Search.prototype;

function Search(){
    this.keyword = document.querySelector('input[name = "search"]');
    this.engine = doucument.querySelector('SelectSearch')
    this.button = document.querySelector('.button-img');
    this.form = doucument.querySelector('.search');
    
    this.Engine();
}

Searching.Engine = function(){
    this.form.addEventListener('submit', e => {
        e.preventDefault();
        let keyword = this.keyword.value;
        location.href = 'https://www.google.com/search?q=' + keyword;
    })
}



new Search();
