const express = require('express');
const router = express.Router();
const Articles = require('../models/articles.models');


router.get('/new', (req, res) => {
    res.render('articles/new', { articles: new Articles() })
});



router.get('/:id', async (req, res) => {
    const articles = await Articles.findById(req.params.id);
    if (articles == null) res.redirect('/')
    res.render('articles/show', {articles: articles})
});

router.post('/', async (req, res) => {
    let articles = new Articles({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try {
        articles = await articles.save()
        res.redirect(`/articles/${articles.id}`)
    } catch (e) {
        console.log(e);
        res.render('articles/new', { articles: articles })
    }
})

module.exports = router;