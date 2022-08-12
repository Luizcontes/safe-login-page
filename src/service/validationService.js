const dbService = require('../service/databaseService')
const bcrypt = require('bcryptjs')
const mailerService = require('../service/mailerService')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

/* 
 *  Service created to deal with user`s validations, in the whole
 *  process, from subscribing, changing password and logging in
*/
class ValidationService {
    constructor() {
        this.user = ''
    }

    // method to check is e-mail and password provided are correct!
    async checkUser({ email, password }) {
        const isSubscribed = await this.isUserReg(email)
        const isPassCorrect = this.isPassCorrect(password)
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
    async generateToken() {
        const { uuid, email } = this.user.dataValues
        const secretKey = crypto.randomBytes(64).toString('hex')
        const payload = { user: { uuid, email } }
        const jwtToken = jwt.sign(payload, secretKey, { expiresIn: '1h' })
        console.log(jwtToken)

        const verified = jwt.verify(jwtToken, secretKey)
        return verified
    }

    /* 
     *  generates de hash pass, persists the user in the DB and
     *  sets up the information to send the e-mail validation
     */
    async registerUser(email, password) {
        const password_hash = await this.getHashPass(password)
        const isNewUser = await dbService.create(email, password_hash)
        if (isNewUser) {
            mailerService.setMsgInfo(isNewUser.dataValues.uuid, email)
            return true
        }
        else {
            return false
        }
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
            return await bcrypt.compare(password, this.user.dataValues.password_hash)
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