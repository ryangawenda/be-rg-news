const {fetchTopics} = require("../models/topics.model")
exports.getTopics = (req,res) => {
    console.log("In Controller")
    return fetchTopics()
    .then((topics) => {
        res.status(200).send({topics} )
    })
    .catch((err)=>{
        next(err)
    })
}