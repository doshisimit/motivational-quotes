const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    hashTags: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Quotes', QuoteSchema);