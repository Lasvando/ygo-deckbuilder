//REQUIRE
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

//Middleware di logging
app.use(morgan("common"));

//Serving static
app.use(express.static('public'));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')))
app.use('/css', express.static(path.join(__dirname, 'node_modules/select2/dist/css')))
app.use('/js', express.static(path.join(__dirname, 'node_modules/select2/dist/js')))

//View Engine
app.set('view engine', 'pug')

//Route Import
const indexRoute = require(path.join(__dirname, 'Routes/indexRoute'));

//Route Use
app.use('/', indexRoute);

//API Import
const searchCardAPI = require(path.join(__dirname, 'Api/searchCard'));

//API Use
app.use("/", searchCardAPI);




app.listen(port, console.log(`Server is running on http://localhost:${port}`));