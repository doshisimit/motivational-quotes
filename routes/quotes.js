const express = require('express');

const router = express.Router();

const Quote = require('../models/Quote');

function paginatedResults(model){
    return async (req,res,next)=>{
        const page= parseInt(req.body.page);
        const limit = parseInt(req.body.limit);

        const startIndex= (page-1)*limit;
        const endIndex= page * limit;

        const result={}

        if(endIndex < await model.countDocuments().exec()){
            result.next={
                page: page+1,
                limit: limit
            }
        }
        if(startIndex > 0){
            result.previous={
                page: page-1,
                limit: limit
            }
        }
        try{
            result.results= await model.find({ 'isApproved': true }).limit(limit).skip(startIndex).exec();
            res.paginatedResults= result;
            next();
        }catch (e){
            res.status(500).json({message: e.message});
        }
        
        
    }
}
// All Posts
router.get('/',paginatedResults(Quote), (req, res) => {
    
        // const quotes = await Quote.find({ 'isApproved': true });
        // res.json(quotes);
     res.json(res.paginatedResults)
    
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
// Update isApproved
router.patch('/isApproved/:id', async (req, res) => {
    console.log("Updatting _id: "+req.params.id+" to isApproved: "+req.body.isApproved);
    try {
        
        
        const updatedQuote = await Quote.updateOne(
            { _id: req.params.id },
            { $set:{ isApproved: req.body.isApproved}}
        )

        res.json(updatedQuote);
    } catch (error) {
        res.json({ message: req.body.isApproved });
    }
});

//Update title
router.patch('/title/:id', async (req, res) => {
    console.log("Updatting _id: "+req.params.id+" to title: "+req.body.title);
    try {
        
        
        const updatedQuote = await Quote.updateOne(
            { _id: req.params.id },
            { $set:{ title: req.body.title}}
        )

        res.json(updatedQuote);
    } catch (error) {
        res.json({ message: req.body.title });
    }
});
//Update imageUrl
router.patch('/imageUrl/:id', async (req, res) => {
    console.log("Updatting _id: "+req.params.id+" to imageUrl: "+req.body.imageUrl);
    try {
        
        
        const updatedQuote = await Quote.updateOne(
            { _id: req.params.id },
            { $set:{ imageUrl: req.body.imageUrl}}
        )

        res.json(updatedQuote);
    } catch (error) {
        res.json({ message: req.body.imageUrl });
    }
});

// Update HashTags
router.patch('/hashTags/:id', async (req, res) => {
    console.log("Updatting _id: "+req.params.id+" to hashTags: "+req.body.hashTags);
    try {
        
        
        const updatedQuote = await Quote.updateOne(
            { _id: req.params.id },
            { $set:{ hashTags: req.body.hashTags}}
        )

        res.json(updatedQuote);
    } catch (error) {
        res.json({ message: req.body.hashTags });
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