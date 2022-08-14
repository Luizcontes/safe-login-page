const dbService = require('../service/databaseService')
const bcrypt = require('bcryptjs')
const mailerService = require('../service/mailerService')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const { MailService } = require('@sendgrid/mail')

/* 
 *  Service created to deal with user`s validations, in the whole
 *  process, from subscribing, changing password and logging in
*/
class ValidationService {
    constructor() {
        this.user = ''
        this.secretKey = 'a5638a895ab58685bdd260cd531437e603c17c48bba1b57963881fc09012c6ad6fbd31383bdb9cec454b8c37d52aea8ffb47a3336004e716d329d429d1f17502'
    }

    // method to check is e-mail and password provided are correct!
    async checkUser({ email, password }) {
        const isSubscribed = await this.isUserReg(email)
        const isPassCorrect = await this.isPassCorrect(password)
        if (isSubscribed && isPassCorrect) {
            return true
        } else {
            return false
        }
    }

    /*  
     *  token generated, and from now on the connection is just kept
     *  while the token is valid 
    */
    async generateToken(auth) {
        const { uuid, email } = this.user.dataValues
        const payload = { user: { uuid, email } }
        return jwt.sign(payload, this.secretKey, { expiresIn: '1m' })
    }

    // checks if the user has a valid token
    async verifyToken(jwtToken) {
        try {
            const verified = jwt.verify(jwtToken, this.secretKey)
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    /* 
     *  generates de hash pass, persists the user in the DB and
     *  sets up the information to send the e-mail validation
     */
    async registerUser(email, password) {
        const password_hash = await this.getHashPass(password)
        const isNewUser = await dbService.create(email, password_hash)
        if (isNewUser) {
            mailerService.setMsgInfo(isNewUser.dataValues.uuid, email, 'checking')
            return true
        }
        else {
            return false
        }
    }

    /* 
     *  Sets up te e-mail msg to be sent for password redefinition
     */
    async recoverAccount() {
        mailerService.setMsgInfo(
            this.user.dataValues.uuid,
            this.user.dataValues.email,
            'recover'
        )
        // mailerService.printMsg()
        return true
    }

    /* 
     *  when the user tries to get it`s first access
     *  this method creates the hash password
    */
    async validateUser(uuid, email) {
        try {
            const isUserReg = await this.isUserReg(email)
            const isUUIDCorrect = this.isUUIDCorrect(uuid)
            const isValidTrue = this.isValidTrue()
            if (isUUIDCorrect && isUserReg && !isValidTrue) {
                const updatedUser = this.updateValidUser()
                if (updatedUser) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

    // sets the validated field in the DB to true
    async updateValidUser() {
        const isUpdated = await dbService.validate(this.user)
        if (isUpdated) {
            return true
        } else {
            return false
        }
    }

    /* 
     * encrypts the password provided by the user in the first access
    */
    async getHashPass(pass) {
        return await bcrypt.hash(pass, 10)
    }

    // checks if the user is registered in the DB
    async isUserReg(email) {
        this.user = await dbService.getByEmail(email)
        if (this.user) {
            return true
        } else {
            return false
        }
    }

    // checks if the UUID passed as a parameter matches the uuid in the DB
    isUUIDCorrect({ uuid }) {
        if (this.user.dataValues.uuid === uuid) {
            return true
        } else {
            return false
        }
    }

    // checks if the password after being crypted matches the hashed pass in the DB
    async isPassCorrect(password) {
        try {
            const pass = await bcrypt.compare(password, this.user.dataValues.password_hash)
            return pass
        } catch (error) {
            console.log(error)
            return false
        }
    }

    //  check either the user has been validated before
    isValidTrue() {
        if (this.user.dataValues.validated) {
            return true
        } else {
            return false
        }
    }
}

module.exports = new ValidationService()