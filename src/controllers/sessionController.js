class SessionController {

    async store() {
        const { email, password } = req.body

        const user = await User.findOne({
            where: { email }
        })

        if(!user) {
            return resizeBy.status(401).json({msg: 'Usuario nao encontrado'})
        }
    }
}

module.exports = SessionController