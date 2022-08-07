const express = require('express')
const { sequelize, user } = require('./models')
const { StatusCodes } = require('http-status-codes')

const app = express()

const PORT = process.env.PORT | 8080

app.use(express.json())

app.get('/users', async (req, res) => {
    try {
        const usuarios = await user.findAll()
        return res.status(StatusCodes.OK).json(usuarios)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

app.get('/users/:uuid', async (req, res) => {
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
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User not found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

app.post('/users', async (req, res) => {
    const { name, email, password_hash, provider } = req.body

    try {
        const usuario = await user.create({ name, email, password_hash, provider })

        return res.status(StatusCodes.OK).json(usuario)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json(error)
    }
})

app.put('/users/:uuid', async (req, res) => {
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
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User not found"})
    }
})

app.listen(PORT, async () => {
    console.log(`Server listening at http://localhost:${PORT}`)
    await sequelize.authenticate()
    console.log('Database connected!')
})