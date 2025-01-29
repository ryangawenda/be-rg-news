const express = require("express");
const app = express();
const {getEndpoints} = require("./controllers/api.controller")
const {getTopics} = require("./controllers/topics.controller")
const {getArticle, getAllArticles, getComments} = require("./controllers/article.controller")
app.get("/api", getEndpoints)

app.get("/api/topics", getTopics)

app.get("/api/articles/:article_id", getArticle)

app.get("/api/articles", getAllArticles)

app.get("/api/articles/:article_id/comments", getComments)


app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    console.log(err);
    res.status(500).send({ msg: "Internal Server Error" });
  }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(9090, () => {
        console.log("Server is listening on port 9090...");
  });
}
  module.exports = app;
  