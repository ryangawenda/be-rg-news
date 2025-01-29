const db = require("../db/connection")
exports.fetchArticleById = (article_id) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1;", [article_id]).then((article) => {
        return article.rows
    })
}

exports.fetchArticles = () => {
    return db.query("SELECT article_id, title, topic, author, created_at, votes, article_img_url FROM articles").then((articles) => {
        return articles.rows
    })
}

exports.fetchComments = (article_id) => {
    return db.query("SELECT * FROM comments WHERE article_id = $1;", [article_id]).then((comments) => {
        return comments.rows
    })
}