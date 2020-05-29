const express = require('express');

const router = express.Router();

const Quote = require('../models/Quote');


// All Posts
router.get('/', async (req, res) => {
    try {
        const quotes = await Quote.find();
        res.json(quotes);
    } catch (error) {
        res.json({ message: error });
    }
});

//Submit Post
router.post('/', async (req, res) => {
    const quote = new Quote({
        title: req.body.title,
        imageUrl: req.body.imageUrl,
        hashTags: req.body.hashTags
    });
    console.log(req.body);
    try {
        const savedQuote = await quote.save()
        res.json(savedQuote);
    }
    catch (err) {
        res.json({ message: err });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        console.log("_id: "+id+" title: "+req.body.title);
        
        const updatedQuote = await quote.updateOne(
            { _id: req.params.id },
            {  title: req.body.title  }
        );

        res.json(updatedQuote);
    } catch (error) {
        res.json({ message: error });
    }
});


//Specific Post
router.get('/:id', async (req, res) => {
    try {
        const quote = await Quote.findById(req.params.id);
        res.json(quote);
    }
    catch (err) {
        res.json({ message: err });
    }

});

module.exports = router;