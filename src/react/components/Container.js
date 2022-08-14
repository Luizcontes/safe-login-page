import React, { useEffect, useState } from 'react'
import Logged from './Logged'
import Login from './Login'

function Container({ props }) {

    const [result, setResult] = useState(<Login props={props} />)

    useEffect(() => {
        renderComponent()
    }, [props.statusCod])

    // setInterval(() => {
    //     console.log(props)
    // },3000)

    const renderComponent = () => {
        switch (props.statusCod) {
            case '0':
                setResult(<Login props={props} />)
                break;
            case '8':
                setResult(<Logged props={props} />)
                break;
        }
    }
    return (<>{result}</>)
}

export default Container