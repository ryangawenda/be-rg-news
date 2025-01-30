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

exports.postComments = (article_id,username,body) => {
    return db.query("SELECT * FROM articles WHERE article_id = $1;", [article_id]).then((article)=> {
        if (article.rows.length === 0){
            return Promise.reject({ status: 404, msg: 'This article does not exist' })
        }
        else{
            return db.query(`
                INSERT INTO comments (article_id, author, body)
                VALUES ($1,$2,$3)
                RETURNING *;`,
            [article_id,username,body])
        }
    })
    .then((output) =>{
        return output.rows
    })
}

exports.updateArticleVotes = (article_id, inc_votes) => {
    return db.query(` UPDATE articles 
        SET votes = votes + $1 
        WHERE article_id = $2
        RETURNING *;`,
        [inc_votes,article_id]   
    )
    .then((updatedArticle) => {
        return updatedArticle.rows
    })
}

exports.deleteComments = (comment_id) => {
    return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *;`, [comment_id])
    .then((returnedComment) => {
        return returnedComment.rows
    })
}