const { Router } = require('express')
const router = Router()

const { user } = require('../database/models')
const { StatusCodes } = require('http-status-codes')

router.get('/users', async (req, res) => {
    try {
        const usuarios = await user.findAll()
        return res.status(StatusCodes.OK).json(usuarios)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

router.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid

    try {
        const usuario = await user.findOne(
            {
                where: { uuid }
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
})

router.post('/users', async (req, res) => {
    const { name, email, password_hash, provider } = req.body

    try {
        const usuario = await user.create({ name, email, password_hash, provider })

        return res.status(StatusCodes.OK).json(usuario)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST)
            .json({
                type: error.name,
                msg: error.errors[0].message,
                content: error.fields.email
            })
    }
})

router.put('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const { name, email, password_hash, provider } = req.body

    try {
        const usuario = await user.findOne({ where: { uuid } })

        await usuario.update(
            {
                name: name,
                email: email,
                password_hash: password_hash,
                provider: provider
            }
        )
        return res.status(StatusCodes.OK).json(usuario)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User not found" })
    }
})

module.exports = router