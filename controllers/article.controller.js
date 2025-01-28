const {fetchArticles} = require("../models/articles.model")
exports.getArticle = (req,res, next) => {
    const article_id = req.params.article_id
    return fetchArticles()
    .then((articles) => {
        console.log(articles)
        const article = articles.find((article) => {
            return article.article_id == article_id
        })
        if (!article) {
            next({ status: 404, msg: 'Article not found' });
        }
        else{
        console.log(article)
        res.status(200).send({article})
        }
    })
    .catch(next)
}