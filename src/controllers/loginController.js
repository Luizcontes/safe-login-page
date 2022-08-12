const { StatusCodes } = require('http-status-codes')
const ValidationService = require('../service/validationService')
const logMsgs = require('../service/errorHandler')
const mailerService = require('../service/mailerService')

class LoginController {

    /* 
     *  when the user tries to subscribe for the first time,
     *  this method takes the email and password, encrypt it, 
     *  generates a uuid number, stores it in the DB and set
     *  the validated field as false
     */
    async register(req, res) {
        const { email, password } = req.body
        const isUserRegistered = await ValidationService.isUserReg(email)
        if (!isUserRegistered) {
            const user = await ValidationService.registerUser(email, password)
            if (user) {
                const isEmailSent = await mailerService.sendMail()
                if (isEmailSent) {
                    res.status(StatusCodes.OK).json(logMsgs.registered)
                }
                else {
                    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(logMsgs.emailServer)
                }
            } else {
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(logMsgs.serverProblem)
            }
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(logMsgs.userRegistered)
        }
    }

    /* 
     *  method called when the user clicks in the link sent by e-mail
     *  and starts the e-mail validation process in the database
     */
    async validate(req, res, next) {
        const isValid = await ValidationService
            .validateUser(req.params, req.query.email)
        if (isValid) {
            res.send('<h1>E-mail validado com sucesso!!!</h1>')
        }
        else {
            res.status(StatusCodes.FORBIDDEN).json(logMsgs.emailServer)
        }
    }

    /* 
     *  method created to verify users credentials and generate a token
     *  to keep the session running with the same client 
     */
    async authenticate(req, res) {

        const userState = await ValidationService.checkUser(req.body)
        if (userState) {
            const token = await ValidationService.generateToken()
            console.log(token)
            res.status(StatusCodes.OK).json(logMsgs.logged)
        } else {
            res.status(StatusCodes.BAD_REQUEST).json(logMsgs.invalidCredentials)
        }
    }

    async update(req, res) {

    }
}

module.exports = new LoginController()