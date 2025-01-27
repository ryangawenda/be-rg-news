const {fetchEndpoints} = require("../models/api.model")

exports.getEndpoints = (req,res) => {
    console.log("In controller");
    const endpoints = fetchEndpoints();
    console.log(endpoints);
    res.status(200).send({endpoints});
}