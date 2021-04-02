const express = require('express');
const router = express.Router();
const Author = require('../models/author');

    //All Authors Route
router.get('/', async (req, res) => {
    try {
        //.find will check for stated contidion, but here we will
        //pass and empty parameter to say we want all authors = no condition
        const authors = await Author.find({})
        res.render('authors/index', { authors: authors });
    } catch {
        res.redirect('/');
    }
});
    //New Author Route
router.get('/new', (req, res) => {
    res.render('authors/new', { author: new Author() });
});
    //Create Author Route
router.post('/', async (req, res) => {
    //res.send('Create')
    //make sure to define that we only accept changes to name 
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save();
        //    res.redirect(`authors/${newAuthor.id}`)
    } catch {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error creating Author'
        });
    }
    //body of form and name property from input of name of name
    //res.send(req.body.name);
});

module.exports = router;