'use client'
import React, { useEffect, useState} from 'react'
import '../login/login.css'
import Navbar from '../../components/navbar/page'
import { UserButton, SignIn, SignUp, useClerk, SignOutButton } from "@clerk/nextjs";
import LoadingOverlay from '../../components/loading/page'

function Login() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(loadingTimeout);
    })

    return (
        <div className='login-home'>
            {loading && <LoadingOverlay />}
            <Navbar />
            <div className='signin-container'>
                <SignIn />
            </div>
        </div>
    )
}

export default Login
