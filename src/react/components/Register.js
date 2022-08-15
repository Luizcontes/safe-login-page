import React from 'react'
import { Link } from 'react-router-dom'

function Register({ props }) {
    const { logStatus, click, email, emailChange, password, passChange } = props

    return (
        <div className='lightbox lightbox-hidden'>
            <div className="container-fluid">
                <Link to='/'><div id="close"></div></Link>
                <div className="row justify-content-center">
                    <div className="col-lg-12 px-5 py-5">

                        <h4 className="py-1">Sign up now and get discounts!!!</h4>

                        <form action="">
                            <div className="form-row pt-3">
                                <div className="col-lg-12">
                                    <input className="form-control my-3 p-2" type="e-mail" onChange={emailChange} value={email} placeholder="Your e-mail" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-12">
                                    <input className="form-control my-3 p-2" type="password" onChange={passChange} value={password} placeholder="***************" />
                                    <p className='error'>{logStatus}</p>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-12">
                                    <button id='register' className="btn1 mb-4" type="button" onClick={click}>Register</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Register