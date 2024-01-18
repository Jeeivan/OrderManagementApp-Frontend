'use client'
import { UserButton, SignIn, SignUp, useClerk } from "@clerk/nextjs";
import Navbar from '../../components/navbar/page'
import { useState } from "react";

function Signup() {
    const [business, setBusiness] = useState(true)
    const handleToggle = () => {
        setBusiness(!business)
        localStorage.setItem('business', business)
    };
    return (
        <div className="login-home" style={{ height: '100%' }}>
            <Navbar />
            <div className="signin-container">
                <SignUp />
                <div class="flex items-center">
                    <input onClick={() => handleToggle()} type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="link-checkbox" class="ms-2 text-sm font-medium text-black-900 dark:text-black-300">Are you a business?</label>
                </div>
            </div>
        </div>
    )
}

export default Signup
