const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (request, response) => {
    console.log(request.session.username);
    if(request.session.username) response.render(path.join(__dirname, '../Pages/index'));
    else response.redirect('/login');
})

module.exports = router;