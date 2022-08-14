import React, { useState, useEffect, useTransition } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import Login from './components/Login'
import Container from './components/Container'
import Logged from './components/Logged'
import Notfound from './components/Notfound'
import Forgot from './components/Forgot'

function App() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logged, setLogged] = useState(false)
    const [msgAlert, setMsgAlert] = useState('')
    const [statusCod, setStatusCod] = useState('')

    useEffect(() => {
        (async function initial() {
            let initial = await axios.post(`/login`)
            if (initial.status === 200) {
                setMsgAlert(initial.data.msg)
                setStatusCod(initial.data.cod)
            }
        })()
    }, [])

    // useEffect(() => {
    //     setMsgAlert('')
    //     setStatusCod('0')
    // }, [email, password])

    function resetFields() {
        setEmail('')
        setPassword('')
    }

    function emailHandler(e) {
        const email = e.target.value
        setEmail(email)
    }

    function passHandler(e) {
        const pass = e.target.value
        setPassword(pass)
    }

    async function onLogginHandler(e) {

        // console.log(!(email && e.target.id === 'forgot'))
        // console.log(email)
        if (!(email && password) && !(email && e.target.id === 'forgot')) {
            alert('There is a missing field')
        }
        else {
            let response = await logUser(e.target.id)
            switch (response.cod || response.data.cod) {
                case '1':
                    setMsgAlert(response.msg)
                    break
                case '2':
                    setMsgAlert(response.msg)
                    break
                case '3':
                    setMsgAlert(response.msg)
                    break
                case '4':
                    setMsgAlert(response.msg)
                    break
                case '5':
                    setMsgAlert(response.msg)
                    break
                case '6':
                    setMsgAlert(response.msg)
                    break
                case '7':
                    setMsgAlert(response.msg)
                    break
                case '8':
                    setMsgAlert(response.data.msg)
                    setStatusCod(response.data.cod)
                    break
                case '9':
                    setMsgAlert(response.data.msg)
                    setStatusCod(response.data.cod)
                    break
            }
        }
    }

    async function logUser(path) {
        try {
            return await axios.post(`/${path}`, { email, password })
        } catch (error) {
            return (error.response.data)
        }
    }

    const props = {
        statusCod: statusCod,
        logStatus: msgAlert,
        email: email,
        emailChange: emailHandler,
        password: password,
        passChange: passHandler,
        click: onLogginHandler,
        reset: resetFields
    }

    let result = ''
    // console.log(msgAlert)
    // console.log(statusCod)
    if (statusCod === '8') {
        result = <Logged props={props} />
    } else if (statusCod === '0') {
        result = <Login props={props} />
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={result} />

                <Route path='/forgot' element={<Forgot props={props} />} />

                <Route path='/register' element={<Container props={props} />} />
                
                <Route path='*' element={<Notfound />} />
            </Routes>
        </BrowserRouter >
    )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)