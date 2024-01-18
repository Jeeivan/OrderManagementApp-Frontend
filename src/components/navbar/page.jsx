'use client'
import React from 'react'
import Link from 'next/link'
import { UserButton, SignIn, SignUp, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

function Navbar() {
    const { user } = useClerk();
    const [profile, setProfile] = useState({})
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownOpen2, setDropdownOpen2] = useState(false);
    const business = localStorage.getItem('business')
    const closeDelay = 3000;

    const handleMouseEnter = () => {
        setDropdownOpen(true);
        setDropdownOpen2(false);
    };

    const handleMouseLeave = () => {
        setTimeout(() => {
            setDropdownOpen(false);
        }, closeDelay);
    };

    const handleMouseEnter2 = () => {
        setDropdownOpen2(true);
        setDropdownOpen(false);
    };

    const handleMouseLeave2 = () => {
        setTimeout(() => {
            setDropdownOpen2(false);
        }, closeDelay);
    };


    useEffect(() => {
        if (user) {
            async function getProfile() {
                try {
                    const response = await fetch(`http://localhost:4000/cProfile/${user?.id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const result = await response.json();
                    if (result == 'Cannot find customerProfile') {
                        if (!business) {
                            window.location.href = "/complete-profile"
                        }
                            async function getBusinessProfile() {
                                try {
                                    const response = await fetch(`http://localhost:4000/bProfile/${user?.id}`, {
                                        method: "GET",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                    });
                                    const result = await response.json();
                                    if (result == 'Cannot find businessProfile') {
                                        if (business) {
                                            window.location.href = "/complete-businessprofile"
                                        }
                                    }
                                    else {
                                        setProfile(result);
                                    }
                                } catch (error) {
                                    console.log("Profile not found", error);
                                }
                            }
                            getBusinessProfile()
                        }
                    else {
                        setProfile(result);
                    }
                } catch (error) {
                    console.log("Profile not found", error);
                }
            }

            getProfile();
        }

    }, [user]);

    return (
        <header className="nav-home header top-0 shadow-md flex items-center justify-between px-8 py-02">
            {/* <!-- logo --> */}
            <a href={'/'} className='nav-home-link'>Trade+.com</a>

            {/* <!-- navigation --> */}
            {profile?.phoneNum &&
                <nav className="nav font-semibold text-lg" style={{ marginTop: '2vh' }}>
                    <ul className="flex items-center">
                        <li className="relative border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                            <button onMouseEnter={handleMouseEnter2}
                                onMouseLeave={handleMouseLeave2} type="button" className='navbar-buttons'>
                                Customers{' '}
                                <svg
                                    className="w-2.5 h-2.5 ms-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div
                                className={`${isDropdownOpen2 ? 'block' : 'hidden'
                                    } absolute  bg-white rounded-lg shadow w-44 dark:bg-gray-700`}
                                style={{ zIndex: 5, width: '32.5vh', height: '24vh' }}
                            >
                                <ul className="text-sm text-gray-700 dark:text-gray-200" style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2vh', height:
                                        '15h'
                                }}>
                                    <li style={{ fontSize: '2vh' }}>
                                        <a href="/about" style={{ color: 'white' }} className=" navbar-buttons dark:hover:bg-gray-300 navbar-options">
                                            How it works
                                        </a>
                                    </li>
                                    {/* <li style={{ fontSize: '2vh', }}>
                                        <a href="/signup" style={{ color: 'white' }} className="navbar-buttons dark:hover:bg-gray-300 navbar-options">
                                            <SignUp />
                                        </a>
                                    </li> */}
                                    <li style={{ fontSize: '2vh', }}>
                                        <a href="/messages" style={{ color: 'white' }} className="navbar-buttons dark:hover:bg-gray-300 navbar-options">
                                            Messages
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                            <button className="navbar-buttons" type="button">
                                <UserButton afterSignOutUrl="/login" />
                            </button>
                        </li>
                    </ul>
                </nav>
            }
            {profile?.owner &&
                <nav className="nav font-semibold text-lg" style={{ marginTop: '2vh' }}>
                    <ul className="flex items-center">
                        <li className="relative border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer active">
                            <button onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave} type="button" className='navbar-buttons'>
                                Business Owners{' '}
                                <svg
                                    className="w-2.5 h-2.5 ms-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div
                                className={`${isDropdownOpen ? 'block' : 'hidden'
                                    } absolute bg-white rounded-lg shadow w-44 dark:bg-gray-700`}
                                    style={{ zIndex: 5, width: '32.5vh', height: '24vh' }}
                            >
                                <ul className="text-sm text-gray-700 dark:text-gray-200" style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2vh', height:
                                        '15h'
                                }}>
                                    <li style={{fontSize: '2vh' }}>
                                        <a href="/enquiries" style={{color: 'white'}} className="navbar-buttons dark:hover:bg-gray-300 navbar-options">
                                            Enquiries
                                        </a>
                                    </li>
                                    <li style={{fontSize: '2vh', }}>
                                        <a href="/profile" style={{color: 'white'}} className="navbar-buttons dark:hover:bg-gray-300 navbar-options">
                                            Profile
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                            <button className="navbar-buttons" type="button" href="/login">
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            }
            {!profile?.owner && !profile?.phoneNum &&
                <nav className="nav font-semibold text-lg" style={{ marginTop: '2vh' }}>
                    <ul className="flex items-center">
                        <li className="relative border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer active">
                            <button onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave} type="button" className='navbar-buttons'>
                                Business Owners{' '}
                                <svg
                                    className="w-2.5 h-2.5 ms-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div
                                className={`${isDropdownOpen ? 'block' : 'hidden'
                                    } absolute top-full left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                                    style={{ zIndex: 5, width: '32.5vh', height: '24vh' }}

                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2vh', height:
                                        '15h'
                                }}>
                                    <li>
                                        <a href="about" className="navbar-buttons hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            How it works
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/signup" className="navbar-buttons hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Trade Sign up
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="relative border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                            <button onMouseEnter={handleMouseEnter2}
                                onMouseLeave={handleMouseLeave2} type="button" className='navbar-buttons'>
                                Customers{' '}
                                <svg
                                    className="w-2.5 h-2.5 ms-3"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                >
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>
                            <div
                                className={`${isDropdownOpen2 ? 'block' : 'hidden'
                                    } absolute top-full left-0 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                                    style={{ zIndex: 5, width: '32.5vh', height: '24vh' }}
                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2vh', height:
                                        '15h'
                                }}>
                                    <li>
                                        <a href="/about" className="navbar-buttons hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            How it works
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/signup" className="navbar-buttons hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Customer Sign up
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">

                            <button className="navbar-buttons" type="button" onClick={() => window.location.href = "/login"}>
                                Login
                            </button>
                        </li>
                    </ul>
                </nav>
            }

            {/* <!-- buttons ---> */}
            {/* <div className="w-3/12 flex justify-end">
                <li href="#" style={{ color: 'black' }} className="h-8 p-1 mt-[-4vh] hover:text-blue-500 duration-200 flex flex-col items-center">
                    <UserButton afterSignOutUrl="/" />
                    {user?.username}
                </li>
            </div> */}
        </header>
    );
}

export default Navbar
