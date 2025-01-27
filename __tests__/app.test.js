const endpointsJson = require("../endpoints.json");
const {articleData, commentData, userData, topicData} = require("../db/data/test-data/index.js")
/* Set up your test imports here */
const request = require("supertest")
const app = require("../app.js")
let server;

/* Set up your beforeEach & afterAll functions here */

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
      expect(topics).toEqual(topicData);
    });
  });
});

