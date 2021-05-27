//REQUIRE
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session')
const { sequelize } = require('./models')

const app = express();
const port = process.env.PORT || 3000;

//Sessions
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
}))

//Env config
require('dotenv').config();

//Pages Folder
app.set('views', path.join(__dirname, 'Pages'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json()); //Parse URL-encoded bodies

//Middleware di logging
app.use(morgan("common"));

//Serving static
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/select2/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/select2/dist/js')));

//View Engine
app.set('view engine', 'pug');

//Route Import
const indexRoute = require(path.join(__dirname, 'Routes/indexRoute'));
const cardDetailRoute = require(path.join(__dirname, 'Routes/cardDetailRoute'));
const registerRoute = require(path.join(__dirname, 'Routes/registerRoute'));
const loginRoute = require(path.join(__dirname, 'Routes/loginRoute'));

//Route Use
app.use('/', indexRoute);
app.use('/', cardDetailRoute);
app.use('/', registerRoute);
app.use('/', loginRoute);

//API Import
const searchCardAPI = require(path.join(__dirname, 'Api/searchCard'));

//API Use
app.use("/", searchCardAPI);



app.listen(port, async () => {
    await sequelize.sync({ alter:true });
    console.log('Database sincronizzato');
    console.log(`Server is running on http://localhost:${port}`);
});