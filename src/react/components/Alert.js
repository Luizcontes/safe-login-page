import React from 'react'
import { Link } from 'react-router-dom'

function Lightbox({ props }) {
    const { logStatus, click, email, emailChange, password, passChange, reset } = props

    return (
        <div className='lightbox lightbox-hidden'>
            <div className="container-fluid">
                <Link to='/'><div id="close" onClick={reset}></div></Link>
                <div className="row justify-content-center">
                    <div className="col-lg-12 px-5 py-5">
                        <p className='registered pt-3'>{logStatus}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Lightbox