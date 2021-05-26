const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/api/searchCard', (request, response) => {
    const term = request.query.term

    if (term && term.length >= 3) {
        let url = `https://db.ygoprodeck.com/carddbsearch.php?term=${term}&language=it`;
        let settings = { method: "Get" };

        fetch(url, settings)
            .then(response => response.json())
            .then((cardsList) => {
                var cards = [];
                if (cardsList.error) {
                    cards.push({
                        "id": 0,
                        "text": "Carta non trovata",
                        "html": `<div class="d-flex justify-content-between"><p class="my-auto search-card-link" style="font-size:12px" href="#0">Nessuna carta trovata</p><img class='card-type-pic' src='icons/undefined.webp'></div>`
                    })
                    response.json(cards);
                    return;
                }
                cardsList.forEach(card => {
                    switch (card.type) {
                        case 'Effect Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Effect Monster.webp'>"
                            break;
                        case 'Fusion Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Fusion Monster.webp'>"
                            break;
                        case 'Synchro Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Synchro Tuner Monster.webp'>"
                            break;
                        case 'Link Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Link Monster.webp'>"
                            break;
                        case 'Normal Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Normal Monster.webp'>"
                            break;
                        case 'Trap Card':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Trap Card.webp'>"
                            break;
                        case 'Spell Card':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Spell Card.webp'>"
                            break;
                        case 'Ritual Effect Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Ritual Effect Monster.webp'>"
                            break;
                        case 'Pendulum Effect Fusion Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Pendulum Effect Fusion Monster.webp'>"
                            break;
                        case 'Pendulum Effect Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Pendulum Effect Monster.webp'>"
                            break;
                        case 'Synchro Pendulum Effect Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Synchro Pendulum Effect Monster.webp'>"
                            break;
                        case 'XYZ Pendulum Effect Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/XYZ Pendulum Effect Monster.webp'>"
                            break;
                        case 'XYZ Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/XYZ Monster.webp'>"
                            break;
                        case 'Spirit Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Spirit Monster.webp'>"
                            break;
                        case 'Normal Tuner Monster':
                            cardImage = "<img class='card-type-pic img-fluid' src='/icons/Normal Tuner Monster.webp'>"
                            break;
                        default:
                            break;
                    }

                    cards.push({
                        "id": card.id,
                        "text": card.label,
                        "html": `<div class="d-flex justify-content-between"><a class="search-card-link my-auto" style="font-size:12px" href="detail/${card.id}">${card.label}</a>${cardImage}</div></a>`
                    })

                });
                response.json(cards);
            });
    }

})

module.exports = router;