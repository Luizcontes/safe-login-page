import React from 'react'
import { Link } from 'react-router-dom'

function Reset({ props }) {
    const { logStatus, click, password2, passConfirm, password, passChange } = props

    return (
        <div className='lightbox lightbox-hidden'>
            <div className="container-fluid">
                <Link to='/'><div id="close"></div></Link>
                <div className="row justify-content-center">
                    <div className="col-lg-12 px-5 py-5">

                        <h4 className="py-1">Enter your new password</h4>

                        <form action="">
                            <div className="form-row pt-3">
                                <div className="col-lg-12">
                                    <input className="form-control my-3 p-2" type="password" onChange={passChange} value={password} placeholder="Your new password" />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-12">
                                    <input className="form-control my-3 p-2" type="password" onChange={passConfirm} value={password2} placeholder="Confirm your password" />
                                    <p className='error'>{logStatus}</p>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-12">
                                    <button id='reset' className="btn1 mb-4" type="button" onClick={click}>Reset Password</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Reset