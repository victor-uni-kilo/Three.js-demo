//check environment(production or not)/!.parse() !.load() ->> use .config()
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
    //require installed body-parser
    //const bodyParser = require('body-parser')


//connect routers
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

//setup view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
//USE
app.use(expressLayouts);
app.use(express.static('public'));
//bodyParser.urlencoded was crossed out: ALSO NOT SAFE!!!
//express.urlencoded will parse URL-encoded bodies as well
app.use(express.urlencoded({ limit: '10mb', extended: false}));

    //import mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true });
    //DATABASE_URL variable needs dotenv library
const db = mongoose.connection;
    //give a warning about db connection
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));


app.use('/', indexRouter);
app.use('/authors', authorRouter);

//the server is going to tell us which port are we listening to || port 3000
app.listen(process.env.PORT || 3000)

