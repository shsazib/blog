const mongoose = require('mongoose');


const articlesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

});

const blogArticles = new mongoose.model('Articles', articlesSchema);


module.exports = blogArticles;