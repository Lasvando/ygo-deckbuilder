const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session')
const crypto = require('crypto')
const { body, validationResult } = require('express-validator');
const { sequelize, User } = require(path.join(__dirname, '../models'))

router.get('/login', (request, response) => {
    if(!request.session.username) response.render(path.join(__dirname, '../Pages/login'));
    else response.redirect('/');
})

router.post('/api/login',
    body('username')
        .trim()
        .isLength({ min: 1 }).withMessage('Nome utente richiesto.'),
    body('password')
        .trim()
        .notEmpty().withMessage('Password richiesta.'),
    async (request, response) => {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(400).json({
                success: false,
                errors: errors.array()
            });
        }

        const username = request.body.username;
        const password = crypto.createHash('sha256').update(request.body.password).digest('base64');;

        try {
            await User.findAndCountAll({ where: {username: username, password: password}}).then(function(result) {

                if(result.count != 1){
                    return response.status(400).json({
                        success: 'false',
                        errors:[{
                                msg: `Nome utente o password non corrispondono`,
                                param: 'error'
                        }]
                    });
                }

                request.session.username = username;
                return response.sendStatus(200);
            })
        } catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }
    })

router.get('/logout', (request, response) => {
    request.session.destroy();
    response.redirect('/');
})
module.exports = router;