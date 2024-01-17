const express = require('express');
const router = express.Router();
const Articles = require('../models/articles.models');


router.get('/new', (req, res) => {
    res.render('articles/new', { articles: new Articles() })
});



router.get('/:slug', async (req, res) => {
    const articles = await Articles.findOne({ slug: req.params.slug });
    if (articles == null) res.redirect('/')
    res.render('articles/show', { articles: articles })
});

router.post('/', async (req, res) => {
    let articles = new Articles({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown
    });
    try {
        articles = await articles.save()
        res.redirect(`/articles/${articles.slug}`)
    } catch (e) {
        console.log(e);
        res.render('articles/new', { articles: articles });

    }
})


router.delete('/:id', async (req, res) => {
    await Articles.findByIdAndDelete(req.params.id);
    res.redirect('/')
})

module.exports = router;