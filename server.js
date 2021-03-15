//check environment(production or not)/!.parse() !.load() ->> use .config()
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

//connect routers
const indexRouter = require('./routes/index');

//setup view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');


app.use(expressLayouts);
app.use(express.static('public'));

    //import mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true});
    //DATABASE_URL variable needs dotenv library
const db = mongoose.connection;
    //give a warning about db connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


app.use('/', indexRouter);

//the server is going to tell us which port are we listening to || port 3000
app.listen(process.env.PORT || 3000)

