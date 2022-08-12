const { user } = require('../database/models')

class DatabaseService {

    // async getAll(req, res) {
    //     // console.log(req.cookies)
    //     try {
    //         const usuarios = await user.findAll()
    //         return res.status(StatusCodes.OK).json(usuarios)
    //         // return res.cookie('name', 'viadinho').send('cookie set')
    //     } catch (error) {
    //         console.log(error)
    //         return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    //     }
    // }

    // gets a user form the database if it is contained in the records
    async getByEmail(email) {
        try {
            const isUser = await user.findOne({ where: { email } })
            if (isUser) {
                return isUser
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
        }
    }

    // creates a new record in the database
    async create(email, password_hash) {
        try {
            return await user.create({ email, password_hash })
        } catch (error) {
            console.log(error)
        }
    }

    // updates a existing record in the database
    async validate(user) {
        try {
            return await user.update({ validated: true })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = new DatabaseService()