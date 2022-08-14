// const express = require('express')
const { Router } = require('express')
const router = Router()
const { StatusCodes } = require('http-status-codes')
const authMiddleware = require('../middlewares/authMiddleware')

/* 
 *  routes used to execute actions in the database
 */
const LoginController = require('../controllers/loginController')
router.post('/register', LoginController.register)
router.post('/forgot', LoginController.forgotPass)
router.get('/checking/:uuid', LoginController.validate)
router.get('/recover/:uuid', LoginController.resetPass)


router.post('/login', LoginController.authenticate)

/* 
 *  Main route to render the front-end to the client
 */
router.get('/', (req, res) => res.status(StatusCodes.OK).render('login'))
router.get('/register', (req, res) => res.render('login'))
router.get('/forgot', (req, res) => res.render('login'))


module.exports = router