const { user } = require('../database/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')
const crypto = require('crypto')
const indexService = require('../service/indexService')

class SessionController {

    async register(req, res) {

        res.status(StatusCodes.OK).render('login')
    }

    async authenticate(req, res) {

        try {
            const { email, password } = req.body
            console.log(req.originalUrl)
            const usuario = await user.findOne({ where: { email } })
            if (!usuario) {
                throw {msg:'user not found', cod:0}
            }
            else if (true) {

            } else {
                console.log('Usuario cadastrado')
            }
            // if (usuario) {
            //     const { uuid, name } = usuario

            //     const secretKey = crypto.randomBytes(64).toString('hex')
            //     const payload = { user: { uuid, name, email } }
            //     const jwtToken = jwt.sign(payload, secretKey, { expiresIn: '1h' })

            //     const verified = jwt.verify(jwtToken, secretKey)
            //     // console.log(verified)

            //     console.log(req.headers.authorization.slice(7))

            //     if (await bcrypt.compare(password, usuario.password_hash)) {

            //         // console.log(jwtToken)
            //         return res.status(StatusCodes.OK).json({ token: jwtToken })
            //     } else {
            //         return res.status(StatusCodes.FORBIDDEN).send('Incorrect Password')
            //     }
            // } else {
            //     res.status(StatusCodes.BAD_REQUEST).send('User not subcribed')
            // }


        } catch (error) {
            // console.log(error)
            res.status(StatusCodes.BAD_REQUEST).json(error)
        }
    }

    async update(req, res) {

    }
}

module.exports = new SessionController()