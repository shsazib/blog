const express = require("express");
const router = express.Router();
const Articles = require("../models/articles.models");

router.get("/new", (req, res) => {
  res.render("articles/new", { articles: new Articles() });
});

router.get("/edit/:id", async (req, res) => {
  const articles = await Articles.findById(req.params.id);
  res.render("articles/edit", { articles: articles });
});

router.get("/:slug", async (req, res) => {
  const articles = await Articles.findOne({ slug: req.params.slug });
  if (articles == null) res.redirect("/");
  res.render("articles/show", { articles: articles });
});


router.post("/", async (req, res, next) => {
    req.articles = new Articles()
    next()
}, saveArticlesRedirect('new'));

router.put("/:id", async (req, res, next) => {
    req.articles = await Articles.findById(req.params.id)
    next()
}, saveArticlesRedirect('edit'));



router.delete("/:id", async (req, res) => {
  await Articles.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticlesRedirect(path) {
  return async(req, res) => {
    let articles = req.articles
        articles.title = req.body.title
        articles.description = req.body.description
        articles.markdown = req.body.markdown
      try {
        articles = await articles.save();
        res.redirect(`/articles/${articles.slug}`);
      } catch (e) {
        console.log(e);
        res.render(`articles/${path}`, { articles: articles });
      }
  };
};
module.exports = router;
