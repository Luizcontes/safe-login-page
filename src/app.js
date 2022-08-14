const express = require('express')
const routes = require('./routes/routes')
const cookieParser = require('cookie-parser')
const path = require('path')

class App {
    constructor() {
        this.app = express()
        this.middlewares()
    }

    middlewares() {
        this.app.use(cookieParser())
        this.app.use(express.json())
        this.app.use(express.static(path.join(__dirname, 'public')))
        this.app.use(routes)
        this.app.set('view engine', 'ejs')
        this.app.set('views', path.resolve(__dirname, './views'))
    }

}

module.exports = new App().app