'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { UserButton, useClerk } from "@clerk/nextjs";
import { NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs";


function CompleteProfile() {
    const [userName, setUserName] = useState("");
    const [number, setNumber] = useState("");
    // const [profilePic, setProfilePic] = useState("");
    const [address, setAddress] = useState("");
    const { user } = useClerk();

    useEffect(() => {
    }, [user])


    async function createProfile() {
        try {
            const response = await fetch(`http://localhost:4000/cProfile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    // profilePic: profilePic,
                    phoneNum: number,
                    address: address,
                    email: user?.primaryEmailAddress.emailAddress,
                    userId: user?.id
                }),
            });
            if (response.ok) {
                console.log("profile created");
                window.location.href = "/";
            } else {
                // Handle error cases
                console.log("Failed to Create profile");
            }
        } catch (error) {
            console.error("Error adding message", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        createProfile();
    };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];
    //     setProfilePic(file);
    // };

    return (
        <div className='home'>
            <h1 style={{ textAlign: 'center', paddingTop: '5vh', fontFamily: 'Croissant One', fontSize: '10vh' }}>Complete Profile</h1>
            <div className="container">
                <div className="form-container">
                    <div className="form-content">
                        <h1 className="form-title">Sign up</h1>
                        <form onSubmit={handleSubmit}>
                            <br />
                            <label>
                                UserName:
                                <input
                                    type="text"
                                    value={user?.username}
                                    disabled
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                email:
                                <input
                                    type="text"
                                    value={user?.primaryEmailAddress}
                                    disabled
                                />
                            </label>
                            <br />
                            <label>
                                Phone Number:
                                <input
                                    type="number"
                                    placeholder='07....'
                                    value={number}
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                            </label>
                            {/* <br />
                            <label>
                                Profile Picture:
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </label> */}
                            <br />
                            <label>
                                Address
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </label>
                            <br />
                            <button type="submit">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompleteProfile
