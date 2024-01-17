require('dotenv').config();
require('./configer/connectdb');
const express = require('express');
const app = express();
const articlesRouter = require('./routes/articles.routes');
const Articles = require('./models/articles.models');
const PORT = process.env.PORT || 3000;
const path = require('path');
const methodOverride = require('method-override')


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false}));

app.use('/articles', articlesRouter);

app.get('/', async(req, res) =>{
    const articles = await Articles.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articles});
});

app.listen(PORT, () =>{
    console.log(`Your Server is listening http://localhost:${PORT}`);
})