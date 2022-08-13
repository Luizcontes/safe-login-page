const ValidationService = require('../service/validationService')
const { StatusCodes } = require('http-status-codes')
const logMsgs = require('../service/errorHandler')

async function authMiddleware(req, res, next) {
    if (req.headers.authorization) {
        const isTokenValid = await ValidationService.verifyToken(req.headers.authorization.slice(7))
        if (isTokenValid) {
            req.auth = true
            next()
        } else {
            next()
        }
    } else {
        next()
    }
}

module.exports = authMiddleware