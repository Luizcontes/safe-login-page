import React, { useState, useEffect, useTransition } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import Login from './components/Login'
import Container from './components/Container'


function App() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logged, setLogged] = useState(false)
    const [msgAlert, setMsgAlert] = useState('')
    const [statusCod, setStatusCod] = useState(0)

    useEffect(() => {
        setMsgAlert('')
        setStatusCod(0)
    }, [email, password])

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

        if (!(email && password)) {
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

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login props={props} />} />

                {/* <Route path='/forgot' element={} */}

                <Route path='/register' element={<Container props={props} />} />
            </Routes>
        </BrowserRouter >
    )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)