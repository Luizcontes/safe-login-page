const express = require('express')
const routerIndex = require('./routes/index')
var cookieParser = require('cookie-parser')
var session = require('express-session')

class App {
    constructor() {
        this.app = express()
        this.middlewares()
    }

    middlewares() {
        this.app.use(express.json())
        this.app.use(routerIndex)
        this.app.use(cookieParser())
        this.app.use(session({
            secret: "Shh, its a secret",
            name: 'session',
            cookie: {
                maxAge: 60000
            }
        }))
    }

}

module.exports = new App().app