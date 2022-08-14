const ValidationService = require('../service/validationService')
const { StatusCodes } = require('http-status-codes')
const logMsgs = require('../service/errorHandler')

async function authMiddleware(req, res, next) {
    console.log(req.cookies)
    if (req.cookies.authorization) {
        const isTokenValid = await ValidationService.verifyToken(req.cookies.authorization)
        if (isTokenValid) {
            next()
        } else {
            console.log('expired')
            next()
        }
    } else {
        console.log('no authorization')
        next()
    }
}

module.exports = authMiddleware