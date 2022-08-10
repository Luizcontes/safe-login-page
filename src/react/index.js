import React, { useState, useEffect, useTransition } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import Login from './components/Login'
import Lightbox from './components/Lightbox'

function App() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [logged, setLogged] = useState(false)
    const [subscribed, setSubscribed] = useState([2, ''])

    useEffect(() => {
        setSubscribed([2, ''])
    }, [email, password])

    function emailHandler(e) {
        const email = e.target.value
        setEmail(email)
        // console.log(email)
    }

    function passHandler(e) {
        const pass = e.target.value
        setPassword(pass)
        // console.log(pass)
    }

    async function onLogginHandler(e) {
        // console.log(e.target.id)
        if (!(email && password)) {
            alert('There is a missing field')
        }
        else {
            const response = await logUser(e.target.id)
            if (response === 0) {
                setSubscribed([0, 'User not found'])
            }
            else if (response === 1) {
                setSubscribed([1, 'Incorrect user or password'])
            }
        }
    }

    async function logUser(path) {
        try {
            return await axios.post(`/${path}`, { email, password })
        } catch (error) {
            console.log(error.response.status)
            return error.response.data.cod
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={
                    <Login
                        logStatus={subscribed[1]}
                        email={email}
                        emailChange={emailHandler}
                        password={password}
                        passChange={passHandler}
                        click={onLogginHandler} />} />
                <Route path='register' element={
                    <Lightbox
                        logStatus={subscribed[1]}
                        email={email}
                        emailChange={emailHandler}
                        password={password}
                        passChange={passHandler}
                        click={onLogginHandler} />} />
            </Routes>
        </BrowserRouter >


    )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)