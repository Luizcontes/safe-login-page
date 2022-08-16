import React from 'react'
import { Link } from 'react-router-dom'

function Forgot({ props }) {
    const { logStatus, click, email, emailChange, reset } = props

    return (
        <div className='lightbox lightbox-hidden'>
            <div className="container-fluid">
                <Link to='/'><div onClick={reset} id="close"></div></Link>
                <div className="row justify-content-center">
                    <div className="col-lg-12 px-5 py-5">

                        <h5 className="py-1">Enter your e-mail to get access back to you account</h5>

                        <form action="">
                            <div className="form-row pt-3">
                                <div className="col-lg-12">
                                    <input className="form-control my-3 p-2" type="e-mail" onChange={emailChange} value={email} placeholder="Your e-mail" />
                                    <p className='error'>{logStatus}</p>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="col-lg-12">
                                    <button id='forgot' className="btn1 mb-4" type="button" onClick={click}>Get your account back</button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Forgot