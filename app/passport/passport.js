const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require("bcryptjs");
const Users = require("../models/Users");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      async function (username, password, done) {
        try {
          const checkEmail = await Users.findOne({
            email: username
          })
          const compare = await bcryptjs.compare(password, checkEmail.password)
          if (!compare || !checkEmail) return done(null, false)
          done(null, compare)
        } catch (e) {
          done(null, false, { message: 'invalid credentials' })
        }
      }

    )
  );
};
