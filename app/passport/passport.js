const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
const Users = require("../models/Users");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(async function (username, password, done) {
            // Check
            const check = Users.findOne({
                email: username,
            });
            if (!check) return done(null, false, { message: "There is no data with that email" });

            const compare = await bcryptjs.compare(password, check.password);
            if (!compare) return done(null, false, { message: "Invalid Credentials" });

            done(null, compare, { message: "Successfuly to login" });
        })
    );
};
