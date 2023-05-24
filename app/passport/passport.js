const LocalStrategy = require("passport-local").Strategy;
const googleStrategy = require('passport-google-oauth2').Strategy
const bcryptjs = require("bcryptjs");
const Users = require("../models/Users");
const { CLIENT_ID, CLIENT_SECRET, CLIENT_CALLBACK } = require('../config/')

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
  ),
  passport.use(new googleStrategy({
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CLIENT_CALLBACK,
    passReqToCallback: true,
    scope: ['profile', 'email'],
  },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const {id,displayName,email,photos}=profile
        const check =await Users.findOne({
          "google.id":id
        })
        if(check)return done(null,check)
        const result = new Users({
          google:{
            id,
            username:displayName,
            email,
            photos:photos[0].value
          }
        })
        await result.save()
        return done(null,result)
      } catch(err) {
        return done(err,false)
      }
    }
  ));
};
