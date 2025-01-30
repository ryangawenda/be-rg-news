const comments = require("../db/data/test-data/comments")
const {fetchArticles, fetchArticleById, fetchComments,postComments, updateArticleVotes, deleteComments} = require("../models/articles.model")
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
    return fetchArticleById(article_id)
    .then((article) => {
          if (article[0] === undefined) {
              return Promise.reject({ status: 404, msg: 'This article does not exist' });
          }
          return fetchComments(article_id); 
      })
    .then((comments) => {
          if (comments.length === 0) {
              next({ status: 200, msg: 'No comments on this article' });
          } else {
              const sortedComments = comments.sort((a, b) => b.created_at - a.created_at);
              res.status(200).send({ comments: sortedComments });
          }
      })
    .catch(next);
};

exports.addComments = (req,res, next) => {
    const article_id = req.params.article_id
    const {username , body} = req.body
    return postComments(article_id,username,body,next)
    .then((comment) => {
        const postedComment = comment[0]
        res.status(201).send({"comment": postedComment})
    })
    .catch(next)
}

exports.patchArticles = (req,res,next) => {    const article_id = req.params.article_id
    const { inc_votes } = req.body;
    return fetchArticleById(article_id)
    .then((article) => {
          if (article[0] === undefined) {
              return Promise.reject({ status: 404, msg: 'This article does not exist' });
          }
    return updateArticleVotes(article_id,inc_votes).
    then((updatedArticleArray) => {
        const updatedArticle = updatedArticleArray[0]
        res.status(200).send({article : updatedArticle})
    })
})
    .catch(next)
}

exports.deleteComment = (req,res,next) => {
    const comment_id = req.params.comment_id
    return deleteComments(comment_id)
    .then((returnedComment)=>{
        if (returnedComment.length === 0){
            next({ status: 404, msg: 'This article does not exist' });
        }
        res.status(204).send()
    })
    .catch(next)
}