import React from 'react'
import { Link } from 'react-router-dom'

function Logged({ props }) {

    return (
        <div className='lightbox lightbox-hidden'>
            <div className="container-fluid">
                <h1 className='registered pt-3'>{props.logStatus}</h1>
            </div>
        </div>
    )
}

export default Logged