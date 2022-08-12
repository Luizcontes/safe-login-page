const logMsgs = {
    userRegistered: {
        cod: '1',
        msg: 'User alredy registered, try to reset the password!'
    },
    serverProblem: {
        cod: '2',
        msg: 'Sorry! We have problems in the server! Try again later.'
    },
    emailServer: {
        cod: '3',
        msg: 'Sorry! We have problems to send e-mail confirmation.'
    },
    emailServer: {
        cod: '4',
        msg: 'Invalid link, please proceed to register.'
    },
    invalidCredentials: {
        cod: '5',
        msg: 'Invalid user or password.'
    },
    logged: {
        cod: '8',
        msg: 'You`re logged in.'
    },
    registered: {
        cod: '9',
        msg: 'To validate your account, check your e-mail folder and click in the link sent.'
    }
}

module.exports = logMsgs