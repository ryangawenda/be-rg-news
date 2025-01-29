const comments = require("../db/data/test-data/comments")
const {fetchArticles, fetchArticleById, fetchComments} = require("../models/articles.model")
exports.getArticle = (req,res, next) => {
    const article_id = req.params.article_id
    return fetchArticleById(article_id)
    .then((article) => {
        const returnedArticle = article[0]
        if (!returnedArticle) {
            next({ status: 404, msg: 'Article not found' });
        }
        else{
        res.status(200).send({"article": returnedArticle})
        }
    })
    .catch(next)
}

exports.getAllArticles = (req,res, next) => {
    return fetchArticles()
    .then((articles) => {
        const sortedArticles = articles.sort((a, b) => b.created_at - a.created_at)
        res.status(200).send({"articles" : sortedArticles})
    })
    .catch(next)
}


exports.getComments = (req,res, next) => {
    const article_id = req.params.article_id
    return fetchComments(article_id)
    .then((comments) => {
        if (comments.length === 0){
            next({ status: 404, msg: 'No comments on this article' });
        }
        else {
        const sortedComments = comments.sort((a, b) => b.created_at - a.created_at)
        console.log(sortedComments)
        res.status(200).send({"comments" : sortedComments})
        }
 })
    .catch(next)
}