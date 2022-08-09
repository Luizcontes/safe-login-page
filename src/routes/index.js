const { Router } = require('express')
const router = Router()

const { user } = require('../database/models')
const { StatusCodes } = require('http-status-codes')

router.get('/users', async (req, res) => {
    // console.log(req.cookies)
    try {
        const usuarios = await user.findAll()
        return res.status(StatusCodes.OK).json(usuarios)
        // return res.cookie('name', 'viadinho').send('cookie set')
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
})

router.get('/users/:uuid', async (req, res) => {
    const uuid = req.params.uuid
    const email = req.body.email
    // console.log(email)

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
})

router.post('/users', async (req, res) => {
    const { name, email, password, provider } = req.body

    try {

        const usuario = await user.create({ name, email, password, provider })

        return res.status(StatusCodes.OK).json(usuario)
    } catch (error) {
        return res.status(StatusCodes.BAD_REQUEST).json(error)
    }
})

// Fixe password change!
router.put('/users/', async (req, res) => {
    const uuid = req.params.uuid
    const { name, email, password, provider } = req.body

    try {
        const usuario = await user.findOne({ where: { email } })
        // const password_hash = 
        // console.log(usuario.password_hash)
        await usuario.update(
            {
                name: name,
                email: email,
                password: password,
                password_hash: usuario.password_hash,
                provider: provider
            }
        )
        return res.status(StatusCodes.OK).json(usuario)
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "User not found" })
    }
})

router.get('/:hash', (req, res) => {

    console.log(req.params.hash)

    return res.send('E-mail validated succesfully')
})

router.use((req, res) => {

    console.log(req.params)

    return res.header('setCookie', 'biscoito=viadinho')
        .send('Fuck you bitch!!!')
})

module.exports = router