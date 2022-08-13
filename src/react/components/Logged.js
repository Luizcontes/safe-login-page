import React from 'react'
import { Link } from 'react-router-dom'

function Logged({ props }) {
    const { logStatus, click, email, emailChange, password, passChange, reset } = props

    return (
        <div className='lightbox lightbox-hidden'>
            <div className="container-fluid">
                {/* <Link to='/'><div id="close" onClick={reset}></div></Link> */}


                <h1 className='registered pt-3'>{logStatus}</h1>



            </div>
        </div>
    )
}

export default Logged