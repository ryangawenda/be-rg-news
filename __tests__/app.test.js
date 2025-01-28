const endpointsJson = require("../endpoints.json");
const {articleData, commentData, userData, topicData} = require("../db/data/test-data/index.js")
/* Set up your test imports here */
const db = require('../db/connection.js');
const request = require("supertest")
const app = require("../app.js")
const seed = require('../db/seeds/seed.js');
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
