const articles = require("../db/data/test-data/articles")
const {fetchArticles} = require("../models/articles.model")
exports.getArticle = (req,res, next) => {
    const article_id = req.params.article_id
    return fetchArticles()
    .then((articles) => {
        const article = articles.find((article) => {
            return article.article_id == article_id
        })
        if (!article) {
            next({ status: 404, msg: 'Article not found' });
        }
        else{

        res.status(200).send({article})
        }
    })
    .catch(next)
}

exports.getAllArticles = (req,res, next) => {
    return fetchArticles()
    .then((articles) => {
        const sortedArticles = articles.sort((a, b) => b.created_at - a.created_at)
        sortedArticles.forEach((article) => {
            delete article.body
        })
        res.status(200).send({"articles" : sortedArticles})
    })
    .catch(next)
}