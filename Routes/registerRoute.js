const express = require('express');
const router = express.Router();
const path = require('path');
const session = require('express-session')
const crypto = require('crypto')
const { body, validationResult } = require('express-validator');
const { sequelize, User } = require(path.join(__dirname, '../models'))

router.get('/register', (request, response) => {
    if(!request.session.username) response.render(path.join(__dirname, '../Pages/register'));
    else response.redirect('/');
})

router.post('/api/register',
    body('username')
        .trim()
        .isLength({ min: 1 }).withMessage('Nome utente richiesto.'),
    body('password')
        .trim()
        .notEmpty().withMessage('Password richiesta.')
        .isLength({ min: 8 }).withMessage('Almeno 8 caratteri richiesti.'),
    body('conferma-password')
        .trim()
        .notEmpty().withMessage('Conferma password richiesta.')
        .custom((value, { req }) => {
            if (value === req.body.password) return true;
            else return false;
        }).withMessage('Le due password non corrispondono.'),
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
        const confermaPassword = request.body['conferma-password'];
        const role = 'user';

        try {
            await User.findAndCountAll({ where: {username: username}}).then(function(result) {

                if(result.count > 0){
                    return response.status(400).json({
                        success: 'false',
                        errors:[{
                                msg: `Lo username ${username} è già in uso`,
                                param: 'username'
                        }]
                    });
                }

                const user = User.create({ username, password, role })
            })


        } catch (error) {
            console.log(error);
            return response.status(500).json(error);
        }

        request.session.username = username;
    })

module.exports = router;