function search() {
    var nomeCarta = $('#cerca-nome-carta').val();
    if (nomeCarta.length >= 3) {
        $.get("/api/searchCard", { term: nomeCarta }, (cardsList) => {
            
        })
    } else {
        $('#cards-list').html("");
    }
}