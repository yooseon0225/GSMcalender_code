const Searching = Search.prototype;
function Search(){
    this.keyword = document.querySelector('input[name = "search"]');
    this.button = document.querySelector('.button-img');
    this.form = doucument.querySelector('.search');
}
new Search();
