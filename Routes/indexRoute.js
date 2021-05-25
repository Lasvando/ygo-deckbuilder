const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/', (request, response) => {
    response.render(path.join(__dirname, '../Pages/index'));
})

module.exports = router;