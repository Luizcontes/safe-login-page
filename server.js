const app = require('./src/app')
const { sequelize } = require('./src/database/models')

const PORT = process.env.PORT || 8080

app.listen(PORT, async () => {
    console.log(`Server listening at port:${PORT}`)
    await sequelize.authenticate()
    console.log('Database connected!')
})
