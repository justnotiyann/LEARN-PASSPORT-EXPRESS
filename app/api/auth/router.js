const router = require('express').Router()
const Users = require('../../models/Users')

// Passport
const passport = require('passport')
require('../../passport/passport')(passport)


router.post('/register', async function (req, res, next) {
    try {
        const { email, password } = req.body
        // if (!email && !password) return res.status(200).json({ data: ['All input are required'] })
        if (!email || !password) return next("All Input are required")
        const result = new Users({
            email,
            password
        })
        await result.save()
        res.status(200).json({
            data: ['Success to register']
        })
    } catch (e) {
        next(e)
    }
})

// With passport local
router.post("/login-local", function (req, res, next) {
    passport.authenticate("local", {
        session: false,
        successRedirect: "/home"
    }, function (err, user, info) {
        if (!user || err) return res.status(400).json({ code: 400, data: ["Invalid Credentials"] });
        res.redirect("/home")
    })(req, res, next);
});



// with passport-google-oauth
router.get('/google', passport.authenticate('google'))
router.get( '/google/callback',function(req,res,next){
  passport.authenticate( 'google',{
    failureRedirect:'/google/failure'
  })
  res.redirect('/home')
  (req,res,next)
})

router.get('/google/failure', function (req, res, next) {
    res.json({ message: "Gagal login with google" })
})




module.exports = router
