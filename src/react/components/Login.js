import React from 'react'
import { Link } from 'react-router-dom'

function Login({ props }) {
    const { logStatus, click, email, emailChange, password, passChange } = props

    return (
        <section className="formulario my-4 mx-5">
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-12 px-5 py-5">

                        <img src="img/logo.png" className="img py-2" />
                        <h4 className="py-1">Sign into your account</h4>

                        <form action="">
                            <div className="form-row pt-3">
                                <div className="col-lg-12">
                                    <input className="form-control my-3 p-2" type="e-mail" onChange={emailChange} value={email} placeholder="Your e-mail" />
                                    <p className='error'>{logStatus[1]}</p>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-12">
                                    <input className="form-control my-3 p-2" type="password" onChange={passChange} value={password} placeholder="***************" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-12">
                                    <button id='login' className="btn1 mb-4" type="button" onClick={click}>Login</button>
                                </div>
                            </div>
                            <a className="anchor pt-2" href="#">Forgot password</a>
                            <p>Don`t have an account?
                                <Link to='register'> Register here</Link>
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Login