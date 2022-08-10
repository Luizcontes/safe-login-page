const express = require('express')
const { Router } = require('express')
const router = Router()
const { StatusCodes } = require('http-status-codes')

// express.use(express.static('public'))

const loginController = require('../controllers/loginController')
router.post('/login', loginController.authenticate)
router.post('/register', loginController.register)

const indexController = require('../controllers/indexController')
router.get('/users', indexController.getAll)
router.get('/users/:email', indexController.getByEmail)
router.post('/users', indexController.create)
router.put('/users/', indexController.update)


// router.get('/:hash', (req, res) => {

//     console.log(req.params.hash)

//     return res.send('E-mail validated succesfully')
// })


router.get('/', (req, res) => {

    return res.status(StatusCodes.OK).render('login')
})

module.exports = router