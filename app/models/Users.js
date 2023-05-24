const mongoose = require("mongoose");

const Users = mongoose.model(
    "user",
    mongoose.Schema({
        email: String,
        password: String,
        google: {
            id: String,
            email: String,
            username: String,
            photos: String,
        },
    })
);

module.exports = Users;
