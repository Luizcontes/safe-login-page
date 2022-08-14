import React, { useState, useEffect, useTransition } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import axios from 'axios'
import Login from './components/Login'
import Container from './components/Container'
import Logged from './components/Logged'
import Notfound from './components/Notfound'
import Forgot from './components/Forgot'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            logged: '',
            msgAlert: '',
            statusCod: '',
            emailChange: this.emailHandler,
            passChange: this.passHandler,
            click: this.onClickHandler,
            reset: this.resetFields
        }
        this.initial()
        this.logUser = this.logUser.bind(this)
    }

    async initial() {
        let initial = await axios.post(`/login`)
        if (initial.status === 200) {
            this.setState({
                msgAlert: initial.data.msg,
                statusCod: initial.data.cod
            })
        } else {
            this.setState({
                msgAlert: '',
                statusCod: 0
            })
        }
    }

    // useEffect(() => {
    //     this.setState({ msgAlert: '')
    // }     setStatusCod(0)
    // }, [email, password])

    // resetFields() {
    //     this.state.email = ''
    //     this.state.password = ''
    // }

    emailHandler = (e) => {
        const email = e.target
        this.setState({ email: email })
        console.log(this.email)
    }

    passHandler = (e) => {
        const pass = e.target.value
        this.setState({ password: pass })
    }

    onClickHandler = async (e) => {
        if (!(this.state.email && this.state.password) &&
            !(this.state.email && e.target.id === 'forgot')) {
            alert('There is a missing field')
        }
        else {
            let response = await this.logUser(e.target.id)
            switch (response.cod || response.data.cod) {
                case '1':
                    this.setState({ 
                        msgAlert: response.msg,
                        statusCod: response.cod
                     })
                    break
                case '2':
                    this.setState({ 
                        msgAlert: response.msg,
                        statusCod: response.cod
                     })
                    break
                case '3':
                    this.setState({ 
                        msgAlert: response.msg,
                        statusCod: response.cod
                     })
                    break
                case '4':
                    this.setState({ 
                        msgAlert: response.msg,
                        statusCod: response.cod
                     })
                    break
                case '5':
                    this.setState({ 
                        msgAlert: response.msg,
                        statusCod: response.cod
                     })
                    break
                case '6':
                    this.setState({ 
                        msgAlert: response.msg,
                        statusCod: response.cod
                     })
                    break
                case '7':
                    this.setState({ 
                        msgAlert: response.msg,
                        statusCod: response.cod
                     })
                    break
                case '8':
                    this.setState({
                        msgAlert: response.data.msg,
                        statusCod: response.data.cod
                    })
                    break
                case '9':
                    this.setState({
                        msgAlert: response.data.msg,
                        statusCod: response.data.cod
                    })
                    break
            }
        }
    }

    async logUser(path) {
        try {
            return await axios.post(`/${path}`, {
                email: this.state.email,
                password: this.state.password
            })
        } catch (error) {
            return (error.response.data)
        }
    }

    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Container props={this.state} />} />

                    <Route path='/forgot' element={<Forgot props={this.state} />} />

                    <Route path='/register' element={<Container props={this.state} />} />

                    <Route path='*' element={<Notfound />} />
                </Routes>
            </BrowserRouter >
        )
    }
}

const root = createRoot(document.querySelector('#app'))
root.render(<App />)