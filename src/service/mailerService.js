require('dotenv').config()
const sgMail = require('@sendgrid/mail')

/* 
 *  service in charge of sending a validatin msg to the new user
 */
class Mailer {
    constructor() {
        this.sgMail = sgMail.setApiKey(process.env.EMAIL_PASS)
        this.msg = ''
    }

    // creates the msg template to be sent
    setMsgInfo(uuid, email) {
        this.msg = {
            to: email, // Change to your recipient
            from: 'contes.dev@hotmail.com', // Change to your verified sender
            subject: 'Contes Store - E-mail validation',
            html: `<a href="http://localhost:8080/checking/${uuid}?email=${email}">Clique aqui para validar seu email</a>`
        }
    }

    // sends the msg to the recipient passef as parameter from the controller
    sendMail() {
        return this.sgMail.send(this.msg).then(() => {
            console.log('Email sent')
            return true
        })
            .catch(error => {
                console.log(error)
                return false
            })
    }

    // sample msg to validate message body
    printMsg() {
        console.log(this.msg)
    }
}

module.exports = new Mailer()