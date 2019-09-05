const db = require("../models/User");

// Defining methods for the user controller
module.exports = {
    createUser: function (req, res) {
        console.log("hit api")
        console.log(req.body)
        db
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
}

