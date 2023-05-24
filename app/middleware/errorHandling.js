const erroHandling = function (err, req, res, next) {
    res.status(400).json({
        data: [err]
    })
}

module.exports = erroHandling