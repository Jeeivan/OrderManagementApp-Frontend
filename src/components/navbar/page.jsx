'use client'
import React from 'react'
import Link from 'next/link'
import { UserButton, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from 'react';

function Navbar() {
    const { user } = useClerk();
    const [profile, setProfile] = useState({})
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isDropdownOpen2, setDropdownOpen2] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const toggleDropdown2 = () => {
        setDropdownOpen2(!isDropdownOpen2);
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
                                    window.location.href = "/business";
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
                            <button onClick={toggleDropdown2} type="button" className='navbar-buttons'>
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
                                style={{ zIndex: 5, width: '30.5vh', height: '15vh' }}
                            >
                                <ul className="text-sm text-gray-700 dark:text-gray-200" style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2vh', height:
                                        '15h'
                                }}>
                                    <li style={{ marginBottom: '2vh', fontSize: '2vh' }}>
                                        <a href="/about" className="dark:hover:bg-gray-300 navbar-options">
                                            How it works
                                        </a>
                                    </li>
                                    <li style={{ marginBottom: '2vh', fontSize: '2vh', }}>
                                        <a href="/signup" className="dark:hover:bg-gray-300 navbar-options">
                                            Customer Sign up
                                        </a>
                                    </li>
                                    <li style={{  fontSize: '2vh', }}>
                                        <a href="/messages" className="dark:hover:bg-gray-300 navbar-options">
                                            Messages
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
            {profile?.owner &&
                <nav className="nav font-semibold text-lg" style={{ marginTop: '2vh' }}>
                    <ul className="flex items-center">
                        <li className="relative border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer active">
                            <button onClick={toggleDropdown} type="button" className='navbar-buttons'>
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
                                style={{ zIndex: 5, width: '30.5vh', height: '10vh' }}

                            >
                                <ul className="text-sm text-gray-700 dark:text-gray-200" style={{
                                    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '2vh', height:
                                        '15h'
                                }}>
                                    <li style={{ marginBottom: '2vh', fontSize: '2vh' }}>
                                        <a href="/enquiries" className="dark:hover:bg-gray-300 navbar-options">
                                            Enquiries
                                        </a>
                                    </li>
                                    <li style={{ fontSize: '2vh', }}>
                                        <a href="/profile" className="dark:hover:bg-gray-300 navbar-options">
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
                            <button onClick={toggleDropdown} type="button" className='navbar-buttons'>
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
                                style={{ zIndex: 5, }}

                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <a href="about" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            How it works
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/signup" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            Trade Sign up
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className="relative border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                            <button onClick={toggleDropdown2} type="button" className='navbar-buttons'>
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
                                style={{ zIndex: 5, }}
                            >
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                    <li>
                                        <a href="/about" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                            How it works
                                        </a>
                                    </li>
                                    <li>
                                        <a href="/signup" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
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
