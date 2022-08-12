const { user } = require('../database/models')
var bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')

class IndexController {

    async getAll(req, res) {
        // console.log(req.cookies)
        try {
            const usuarios = await user.findAll()
            return res.status(StatusCodes.OK).json(usuarios)
            // return res.cookie('name', 'viadinho').send('cookie set')
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    async getByEmail(req, res) {
        const email = req.body.email
        
        try {
            const usuario = await user.findOne(
                {
                    where: { email }
                }
            )
            if (usuario) {
                return res.status(StatusCodes.OK).json(usuario)
            } else {
                return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User not found" })
            }
        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
        }
    }

    async create(req, res) {
        const { name, email, password, provider } = req.body

        try {

            const usuario = await user.create({ name, email, password, provider })

            return res.status(StatusCodes.OK).json(usuario)
        } catch (error) {
            return res.status(StatusCodes.BAD_REQUEST).json(error)
        }
    }


    async update(req, res) {
        const { name, email, password, provider } = req.body

        try {
            const usuario = await user.findOne({ where: { email } })
            console.log(usuario.password_hash)
            console.log(password)

            if (await bcrypt.compare(password, usuario.password_hash)) {

                await usuario.update(
                    {
                        name: name,
                        password: password,
                        provider: provider
                    }
                )
                return res.status(StatusCodes.OK).json(usuario)
            } else {
                throw new Error('Invalid Password')
            }

        } catch (error) {
            console.log(error)
            return res.status(StatusCodes.BAD_REQUEST).json({ error })
        }
    }
}

// module.exports = new IndexController()