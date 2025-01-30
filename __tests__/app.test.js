const endpointsJson = require("../endpoints.json");
const {articleData, commentData, userData, topicData} = require("../db/data/test-data/index.js")
/* Set up your test imports here */
const db = require('../db/connection.js');
const request = require("supertest")
const app = require("../app.js")
const seed = require('../db/seeds/seed.js');
const articles = require("../db/data/test-data/articles.js");
/* Set up your beforeEach & afterAll functions here */
beforeEach(() => seed({ topicData, userData, articleData, commentData }))
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: Responds with an object detailing the documentation for each endpoint", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(({ body: { endpoints } }) => {
        expect(endpoints).toEqual(endpointsJson);
      });
  });
});



describe("GET /api/topics" , () => {
  test("200:Responds with an array of topic objects with a slug and description properties on each", () => {
    return request(app)
    .get("/api/topics")
    .expect(200)
    .then(({ body: { topics } }) => {
      expect(topics.length).toEqual(3);
      topics.forEach((topic)=>{
        expect(typeof topic.description).toBe("string")
        expect(typeof topic.slug).toBe("string")
      })

    });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: Responds with an article object with all neccessary properties", () => {
    return request(app)
    .get("/api/articles/2")
    .expect(200)
    .then(({body : {article}}) => {
      expect(typeof article.author).toBe("string")
      expect(typeof article.title).toBe("string")
      expect(typeof article.article_id).toBe("number")
      expect(typeof article.body).toBe("string")
      expect(typeof article.topic).toBe("string")
      expect(typeof article.created_at).toBe("string")
      expect(typeof article.votes).toBe("number")
      expect(typeof article.article_img_url).toBe("string")
  })
})
test("404: Responds with error 404 for an invalid article_id", () => {
  return request(app)
  .get("/api/articles/22")
  .expect(404)
})
})

describe("GET /api/articles" , () => {
  test("200: Responds with all the article objects in an array", () => {
    const sortedArticles = articleData.sort((a, b) => b.created_at - a.created_at)
    return request(app)
    .get("/api/articles")
    .expect(200)
    .then((articles) => {
      const returnedArticles = articles.body.articles
      expect(returnedArticles.length).toEqual(articleData.length)
      let count = 0
      returnedArticles.forEach((article) => {
      expect( article.author).toEqual(sortedArticles[count].author)
      expect( article.title).toEqual(sortedArticles[count].title)
      expect( typeof article.article_id).toEqual("number")
      expect( article.body).toEqual(undefined)
      expect( article.topic).toEqual(sortedArticles[count].topic)
      expect( typeof article.votes).toEqual("number")
      expect( article.article_img_url).toEqual(sortedArticles[count].article_img_url)
      count ++
    })
    }
  )
  })
})

describe("GET /api/articles/:article_id/comments", () => {
  test("200: Responds with all the comments for a given article", () => {
    return request(app)
    .get("/api/articles/6/comments")
    .expect(200)
    .then(({body : {comments}}) => {
      comments.forEach((comment)=>{
        expect(typeof comment.comment_id).toEqual("number")
        expect(typeof comment.votes).toEqual("number")
        expect(typeof comment.created_at).toEqual("string")
        expect(typeof comment.author).toEqual("string")
        expect(typeof comment.body).toEqual("string")
        expect(typeof comment.article_id).toEqual("number")
      })
    })
  })
  test("200: Returns an empty array if no comments are present", () => {
    return request(app)
    .get("/api/articles/4/comments")
    .expect(200)
    .then(({body}) => {
      expect(body.msg).toBe('No comments on this article')
    })
  })
  test("404: Responds with error 404 for an invalid article_id", () => {
    return request(app)
    .get("/api/articles/22/comments")
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("This article does not exist")
    })
    
  })
})

describe("POST /api/articles/:article_id/comments", () => {
  test("201: Posts a comment to the designated article_id and returns the comment body", () => {
     return request(app)
     .post("/api/articles/2/comments").send({
      username: 'icellusedkars',
      body : "I love posting comments"
    })
    .expect(201)
    .then(({body : {comment}}) => {
      expect(comment.article_id).toEqual(2);
      expect(comment.author).toEqual('icellusedkars');
      expect(comment.body).toEqual("I love posting comments");
    })
    });
  test("404: Returns an error if an invalid article_id is given", () => {
    return request(app)
    .post("/api/articles/22/comments")
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("This article does not exist")
    })
    })
});

describe("PATCH api/articles/:article_id" , () => {
  test("202:Will increase the the votes of the selected article", () => {
    return request(app)
    .patch("/api/articles/1")
    .send({inc_votes : 10})
    .expect(200)
    .then(({body : {article}}) => {
      expect(article.votes).toEqual(10)
    })
  })
  test("404: Returns an error if an invalid article_id is given", () => {
    return request(app)
    .patch("/api/articles/19")
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("This article does not exist")
    })
    })
})

describe("DELETE api/comments/:comment_id", () => {
  test("204: Deletes a comment when given a corresponding comment_id", () => {
    return request(app)
    .delete("/api/comments/12")
    .expect(204)
    .then(() => {
       return db.query('SELECT * FROM comments WHERE comment_id = 12'); 
      })
    .then((result) => {
        expect(result.rows.length).toBe(0);
    })
  })
  test("404: Returns an error if an invalid article_id is given", () => {
    return request(app)
    .delete("/api/comments/78")
    .expect(404)
    .then(({body}) => {
      expect(body.msg).toBe("This article does not exist")
    })
    })
})