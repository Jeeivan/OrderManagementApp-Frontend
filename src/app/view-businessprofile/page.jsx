'use client'
import React from 'react'
import Navbar from "@/components/navbar/page"
import { useEffect, useState } from 'react';
import LoadingOverlay from '../../components/loading/page';

function viewBusinessProfile() {
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({})
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        if (userId) {
            async function getBusinessProfile() {
                try {
                    const response = await fetch(`http://localhost:4000/bProfile/${userId}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const result = await response.json();
                    if (result == 'Cannot find businessProfile') {
                        window.location.href = "/";
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
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(loadingTimeout);
    }, [userId])

    
    return (
        <div>
            {loading && <LoadingOverlay />}
            <Navbar />
            <div className="profile-container">
                <div className="profile-header">{profile?.businessName}</div>
                <div className="profile-top">
                    <div className="profile-left">
                        <div className="profile-img"></div>
                    </div>
                    <div className="profile-right">
                        <h2 style={{ display: "flex", justifyContent: 'center' }}>Contact Info</h2>
                        <ul>
                            <li>{profile?.address}</li>
                            <li>{profile?.email}</li>
                            <hr></hr>
                            {profile?.rating === '0' &&
                                'No Rating given yet'}
                            {profile?.rating !== '0' &&
                                <h2>Overall Rating {profile?.rating}</h2>}
                        </ul>
                    </div>
                </div>
                <div className="profile-description">
                    <p>{profile?.description}</p>
                </div>
            </div>
        </div>
    )
}

export default viewBusinessProfile
