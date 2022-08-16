const { StatusCodes } = require('http-status-codes')
const ValidationService = require('../service/validationService')
const logMsgs = require('../service/errorHandler')
const mailerService = require('../service/mailerService')
const e = require('express')

class LoginController {

    //  when the user tries to subscribe for the first time,
    //  this method takes the email and password, encrypt it, 
    //  generates a uuid number, stores it in the DB and set
    //  the validated field as false
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
                    res.status(StatusCodes.OK).json(logMsgs.emailServer)
                }
            } else {
                res.status(StatusCodes.OK).json(logMsgs.serverProblem)
            }
        } else {
            res.status(StatusCodes.OK).json(logMsgs.userRegistered)
        }
    }

    //  method called when the user clicks in the link sent by e-mail
    //  and starts the e-mail validation process in the database
    async validate(req, res, next) {
        const isValid = await ValidationService
            .validateUser(req.params, req.query.email)
        if (isValid) {
            res.send('<h1>E-mail validado com sucesso!!!</h1>')
        }
        else {
            res.status(StatusCodes.FORBIDDEN).json(logMsgs.invalidLink)
        }
    }

    //  method created to verify users credentials and generate a token
    //  to keep the session running with the same client 
    async authenticate(req, res, next) {
        if (Object.keys(req.body).length) {
            const userCheck = await ValidationService.checkUser(req.body)
            if (userCheck) {
                const isValid = ValidationService.isValidTrue()
                if (isValid) {
                    const token = await ValidationService
                        .generateToken(req.headers.authorization)
                    res.cookie('authorization', token, {
                        httpOnly: true,
                        maxAge: 30000
                    })
                        .status(StatusCodes.OK)
                        .json(logMsgs.logged)
                } else {
                    res.clearCookie()
                        .status(StatusCodes.OK)
                        .json(logMsgs.notValidated)
                }
            } else {
                res.clearCookie()
                    .status(StatusCodes.OK)
                    .json(logMsgs.invalidCredentials)
            }
        } else {
            const isValidToken = await ValidationService.verifyToken(req.cookies.authorization)
            if (isValidToken) {
                res.status(StatusCodes.OK).json(logMsgs.logged)
            } else {
                res.status(StatusCodes.OK).json(logMsgs.notLogged)
            }
        }
    }

    // if the user loses access to it`s account, after validating that the
    // is in our database we proceed to send him a link to reset his password
    async forgotPass(req, res) {
        const isUserRegistered = await ValidationService.isUserReg(req.body.email)
        if (isUserRegistered) {
            ValidationService.recoverAccount()
            const isEmailSent = await mailerService.sendMail()
            if (isEmailSent) {
                res.status(StatusCodes.OK).json(logMsgs.redefined)
            }
            else {
                res.status(StatusCodes.OK).json(logMsgs.emailServer)
            }
        } else {
            res.status(StatusCodes.OK).json(logMsgs.notValidated)
        }
    }

    // when the user access the e-mail sent in the password reseting request
    // he is automatically redirected to a page to reset his password
    async getResetPass(req, res) {
        const isValid = await ValidationService
            .validateUserPass(req.params, req.query.email)
        console.log(req.params)
        console.log(req.query)
        if (isValid) {
            // res.status(StatusCodes.OK).redirect('/')
            res.cookie('uuid', req.params.uuid, {
                maxAge: 60000
            })
            res.cookie('email', req.query.email, {
                maxAge: 60000
            })
            res.status(StatusCodes.OK).redirect('/reset')
        }
        else {
            console.log('aqui')
            res.status(StatusCodes.FORBIDDEN).json(logMsgs.invalidLink)
        }
    }

    async reset(req, res) {
        const { uuid, email } = req.cookies
        const { password, password2 } = req.body
        if ((password === password2) && password.length !== 0 && password2 !== 0) {
            if (uuid !== undefined && email !== undefined) {
                // console.log(email)
                const isPassUpdated = ValidationService.updatePass(password, email)
                if (isPassUpdated) {
                    console.log('updated')
                    res.clearCookie()
                    res.json(logMsgs.passUpdated)
                } else {
                    console.log('is not updated')
                    res.json(logMsgs.serverProblem)
                }
            }
            else {
                console.log('email undefined')
                res.json(logMsgs.timeExpired)
            }
        } else {
            res.json(logMsgs.emptyPasses)
        }
    }
}

module.exports = new LoginController()