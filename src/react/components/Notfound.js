import React from 'react'
import { Link } from 'react-router-dom'

function Notfound({ props }) {
    const { logStatus, click, email, emailChange, password, passChange, reset } = props

    return (
        <div className='lightbox lightbox-hidden'>
            <div className="container-fluid">
                {/* <Link to='/'><div id="close" onClick={reset}></div></Link> */}


                <h1 className='registered pt-3'>Sorry! Page not found</h1>



            </div>
        </div>
    )
}

export default Notfound