'use client'
import React from 'react'

function Business() {

    async function yesBusiness() {
                window.location.href = "/complete-businessprofile";
    }

    async function notBusiness() {
        window.location.href = "/complete-profile";
    }

    return (
        <div className='home'>
            <h1>Are youa business?</h1>
            <span><button onClick={yesBusiness}>Yes</button><button onClick={notBusiness}>No</button></span>
        </div>
    )
}

export default Business
