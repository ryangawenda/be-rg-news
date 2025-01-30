const {fetchUsers} = require("../models/users.model")

exports.getUsers = (req,res,next) => {
    return fetchUsers()
    .then((users) => {
        res.status(200).send({"users" : users}) 
    })
    .catch(next)
}