require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// config
const { MONGODB_URL } = require("./app/config");

// Mongoose
const mongoose = require("mongoose");
mongoose
    .connect(MONGODB_URL, { useNewUrlParser: true })
    .then(console.log("Connected to database"))
    .catch((e) => console.log(e.message));

// passport
const passport = require("passport");
const e = require("express");
require("./app/passport/passport")(passport);

// Passport Local
// const options = (req, res, next) => {
//     passport.authenticate("local", function (err, user, info) {
//         if (err || !user || info) next(err || user || info);
//     })(req, res, next);
// };

app.post("/auth/login-local", function (req, res, next) {
    passport.authenticate("local", function (err, user, info) {
        if (err) next(err);
        if (!user) return res.status(400).json({ code: 400, data: ["Invalid Credentials"] });
    })(req, res, next);
});

app.use(function (err, req, res, next) {
    res.json({
        message: err,
        data: "Dari handle error",
    });
});

// app.post("/auth/passport-local", function (req, res, next) {
//     passport.authenticate("local", function (err, user, info) {
//         if (err || !user) next(err || user);
//         if (info) return res.status(200).json({ code: 200, data: [info] });
//     })(req, res, next);
// });

app.listen(port, () => console.log("Server up and running"));
