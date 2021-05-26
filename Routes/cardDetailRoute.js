const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const path = require('path');

router.get('/detail/:cardId', (request, response) => {
    const cardId = request.params.cardId;
    if(!cardId) response.status(404).send('Carta non trovata :(');

    let url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}&language=it`;
    console.log(url);
        let settings = { method: "Get" };

        fetch(url, settings)
            .then(res => res.json())
            .then(cardDetail => {
                var cards = cardDetail.data
                if(cards.length > 1) response.status(404).send('Carta non trovata :(');
                console.log(cards)
                response.render(path.join(__dirname, '../Pages/detail'),{ "card": cards});
            })

})

module.exports = router;