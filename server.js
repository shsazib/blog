const express = require('express');
const app = express();
const articlesRouter = require('./routes/articles.routes')
const PORT = 5000;
const path = require('path');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))


app.use('/articles', articlesRouter);

app.get('/', (req, res) =>{
    const articles = [{
        title: 'Test Article',
        description: 'hello This is Description',
        createdAt: new Date()
    }]
    res.render('articles/index', { articles: articles});
});

app.listen(PORT, () =>{
    console.log(`Your Server is listening http://localhost:${PORT}`);
})