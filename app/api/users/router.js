const Users = require('../../models/Users')
const router = require('express').Router()


router.get('/all', async function (req, res, next) {
    const result = await Users.find()
    res.status(200).json({
        data: result
    })
})

router.get('/search', async function (req, res, next) {
    const result = await Users.findOne({
        email: req.query.email
    })
    res.status(200).json({
        result
    })
})

router.delete('/delete', async function (req, res, next) {
    const username = req.query.email
    await Users.findOneAndDelete({
        email
    })
    res.status(200).json({ data: ['Deleted'] })
})



module.exports = router