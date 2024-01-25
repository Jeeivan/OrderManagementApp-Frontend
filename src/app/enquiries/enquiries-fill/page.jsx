'use client'
import React, { useState, useEffect} from 'react'
import { UserButton, useClerk } from "@clerk/nextjs";
import Navbar from '@/components/navbar/page';
import Footer from '@/components/footer/page';


function enquiriesFill() {
    const [message, setMessage] = useState('')
    const [profile, setProfile] = useState({})
    const [businessId, setBusinessId] = useState({})
    // const name = localStorage.getItem("name");
    const title = localStorage.getItem("title");
    const description = localStorage.getItem("description");
    const cost = localStorage.getItem("cost");
    const category = localStorage.getItem("category");
    const serviceId = localStorage.getItem("serviceId");
    const userId = localStorage.getItem("userId");
    const { user } = useClerk();

    useEffect(() => {
    // if (!name) {
    //     window.location.href = "/";
    // }
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
                    setProfile(result);
            } catch (error) {
                console.log("Profile not found", error);
            }
        }
        getProfile();
    }
}, [user])

    const handleSubmit = (e) => {
        e.preventDefault();
        createEnquiry();
    };

    async function createEnquiry() {
        try {
            const response = await fetch(`http://localhost:4000/enquiries`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    serviceId: serviceId,
                    message: message,
                    customerId: profile.userId,
                    customerName: profile.firstName + ' ' + profile.lastName,
                    businessId: userId
                }),
            });
            if (response.ok) {
                console.log("Enquiry sent");
                localStorage.removeItem("title")
                localStorage.removeItem("description")
                localStorage.removeItem("cost")
                localStorage.removeItem("category")
                localStorage.removeItem("serviceId")
                window.location.href = "/";
            } else {
                console.log("Failed to Send Enquiry");
            }
        } catch (error) {
            console.error("Error adding message", error);
        }
    }

    return (
        <div className='enquiries-home'>
            <Navbar />
            {/* <h1 style={{ textAlign: 'center', paddingTop: '5vh', fontFamily: 'Croissant One', fontSize: '10vh' }}>Complete Profile</h1> */}
            <div className="container">
                <div className="form-container">
                    <div className="form-content">
                        <h1 className="form-title">Send Enquiry</h1>
                        <form onSubmit={handleSubmit}>
                            {/* <br />
                            <label>
                                Business
                                <input
                                    type="text"
                                    value={name}
                                    disabled
                                />
                            </label> */}
                            <br />
                            <label>
                                Title
                                <input
                                    type="text"
                                    value={title}
                                    disabled
                                />
                            </label>
                            <br />
                            <label>
                                Category
                                <input
                                    type="text"
                                    value={category}
                                    disabled
                                />
                            </label>
                            <br />
                            <label>
                                Description
                                <input
                                    type="text"
                                    value={description}
                                    disabled
                                />
                            </label>
                            <br />
                            <label>
                                Cost
                                <input
                                    type="text"
                                    value={cost}
                                    disabled
                                />
                            </label>
                            <br />
                            <label>
                                Message
                                <input
                                    type="text"
                                    placeholder='Details about Work....'
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </label>
                            <br />
                            <button type="submit">Create</button>
                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default enquiriesFill
