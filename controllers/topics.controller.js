const {fetchTopics} = require("../models/topics.model")
exports.getTopics = (req,res) => {
    const topics = fetchTopics()
    res.status(200).send({topics})
}