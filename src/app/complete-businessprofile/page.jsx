'use client'
import React from 'react'
import { useState, useEffect } from 'react';
import { UserButton, useClerk } from "@clerk/nextjs";
import { NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs";


function CompleteBusinessProfile() {
    const [name, setName] = useState("");
    // const [profilePic, setProfilePic] = useState("");
    const [address, setAddress] = useState("");
    const [owner, setOwner] = useState("")
    const [description, setDescription] = useState("")
    const { user } = useClerk();

    async function createProfile() {
        try {
            const response = await fetch(`http://localhost:4000/bProfile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    businessName: name,
                    // profilePic: profilePic,
                    owner: owner,
                    address: address,
                    email: user?.primaryEmailAddress.emailAddress,
                    userId: user?.id,
                    description: description
                }),
            });
            if (response.ok) {
                console.log("business profile created");
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
                                Business Name:
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
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
                                Owner:
                                <input
                                    type="text"
                                    placeholder=''
                                    value={owner}
                                    onChange={(e) => setOwner(e.target.value)}
                                />
                            </label>
                            <br />
                            <label>
                                Description of business:
                                <input
                                    type="text"
                                    placeholder=''
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
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

export default CompleteBusinessProfile
