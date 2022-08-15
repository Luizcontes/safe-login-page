const logMsgs = {
    notLogged: {
        cod: '0'
    },
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
    invalidLink: {
        cod: '4',
        msg: 'Invalid link, please proceed to register.'
    },
    invalidCredentials: {
        cod: '5',
        msg: 'Invalid user or password.'
    },
    notValidated: {
        cod: '6',
        msg: 'User not validated.'
    },
    logged: {
        cod: '7',
        msg: 'Session valid.'
    },
    logged: {
        cod: '8',
        msg: 'You`re logged in.',
        logged: true,
    },
    registered: {
        cod: '9',
        msg: 'To validate your account, check your e-mail folder and click in the link sent.'
    },
    redefined: {
        cod: '10',
        msg: 'To redefine your password, check your e-mail folder and click in the link sent.'
    },
    newPass: {
        cod: '11',
    }
}

module.exports = logMsgs