import React from 'react'
import Alert from './Alert'
import Register from './Register'

function Container({ props }) {
    const { statusCod, logStatus, click, email, emailChange, password, passChange } = props

    let result
    if (statusCod === '9') {
        result = <Alert props={props}/>
    } else {
        result = <Register props={props} />
    }

    return (
        <>
        {result}      
        </>
    )

}

export default Container