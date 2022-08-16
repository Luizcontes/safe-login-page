import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import Login from './components/Login'
import Logged from './components/Logged'
import Notfound from './components/Notfound'
import Forgot from './components/Forgot'
import Reset from './components/Reset'
import Register from './components/Register'

function App() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [logged, setLogged] = useState(false)
    const [msgAlert, setMsgAlert] = useState('')
    const [statusCod, setStatusCod] = useState('')

    let { uuid } = useParams()

    useEffect(() => {
        (async function initial() {
            let initial = await axios.post(`/login`)
            if (initial.data.logged) {
                setLogged(true)
                setStatusCod(initial.data.cod)
                setMsgAlert(initial.data.msg)
            } else {
                setLogged(false)
                setStatusCod(initial.data.cod)
                setMsgAlert(initial.data.msg)
            }
        })()
    }, [])

    useEffect(() => {
        setMsgAlert('')
    }, [email, password, password2])

    function resetFields() {
        setEmail('')
        setPassword('')
        setPassword2('')
    }

    function emailHandler(e) {
        const email = e.target.value
        setEmail(email)
    }

    function passHandler(e) {
        const pass = e.target.value
        setPassword(pass)
    }

    function passConfirm(e) {
        const pass = e.target.value
        setPassword2(pass)
    }

    async function onLogginHandler(e) {

        if (!(email && password) && !(email && e.target.id === 'forgot') && !(password === password2)) {
            alert('There is a missing field')
        }
        else {
            let response = await logUser(e.target.id)
            setMsgAlert(response.data.msg)
            setStatusCod(response.data.cod)
            setLogged(response.data.logged)
        }
    }

    async function logUser(path) {
        try {
            return await axios.post(`/${path}`, { email, password, password2 })
        } catch (error) {
            console.log(error)
        }
    }

    const props = {
        statusCod: statusCod,
        logStatus: msgAlert,
        email: email,
        emailChange: emailHandler,
        password: password,
        passChange: passHandler,
        password2: password2,
        passConfirm: passConfirm,
        click: onLogginHandler,
        reset: resetFields
    }

    const component = () => {
        if (logged) {
            return <Logged props={props} />
        } else if (statusCod !== '') {
            return <Login props={props} />
        } else {
            return (<div></div>)
        }
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={component()} />

                <Route path='/forgot' element={<Forgot props={props} />} />

                <Route path='/register' element={<Register props={props} />} />

                <Route path='/reset' element={<Reset props={props} />} />

                <Route path='*' element={<Notfound props={props} />} />
            </Routes>
        </BrowserRouter >
    )
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)