const express = require("express");
const app = express();
const {getEndpoints} = require("./controllers/api.controller")

app.use(express.json())

app.get("/api", getEndpoints)


if (process.env.NODE_ENV !== 'test') {
    app.listen(9090, () => {
        console.log("Server is listening on port 9090...");
  });
}
  module.exports = app;
  