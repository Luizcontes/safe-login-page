const express = require('express')
const routerIndex = require('./routes/index')

class App {
    constructor(){
        this.app = express()
        this.usingJson()
        this.routing()
    }

    usingJson() {
        this.app.use(express.json())
    }

    routing() {
        this.app.use(routerIndex)
    }
}

module.exports = new App().app