'use client'
import Navbar from "@/components/navbar/page"
import { useEffect, useState } from 'react';
import { UserButton, useClerk } from "@clerk/nextjs";
import LoadingOverlay from '../../components/loading/page';
import ServiceCard from "../services/service-card/page";
import ServiceModal from "../services/service-modal/page";

function Profile() {
    const { user } = useClerk();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({})
    const [services, setServices] = useState(false)

    useEffect(() => {
        if (user) {
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

            if (profile) {
                async function getServices() {
                    try {
                        const response = await fetch(`http://localhost:4000/services/${user?.id}`, {
                            method: "GET",
                            headers: {
                                "Content-Type": "application/json",
                            },
                        });
                        const result = await response.json();
                        if (result == 'Cannot find Services') {
                            setServices(false)
                        } else {
                            setServices(result)
                        }
                    } catch (error) {
                        console.log("Service not found", error);
                    }
                }
                getServices()
            }
        }
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(loadingTimeout);
    }, [user])

    return (
        <>
            <div>
                {loading && <LoadingOverlay />}
                <Navbar />
                <div className="profile-container">
                    <div>
                    <div className="profile-header">
                        <h1>{profile?.businessName}</h1>
                    </div>
                        <div className="profile-userButton"><UserButton afterSignOutUrl="/" /></div>
                    </div>

                    <div className="profile-top">
                        <div className="profile-left">
                            <div className="profile-img"></div>
                            <div className="profile-description">
                            <button className="profile-button" href={'/settings'}>Edit Info</button>
                                <p>{profile?.description}</p>
                            </div>
                        </div>
                        <div className="profile-right">
                            <h2 style={{ display: "flex", justifyContent: 'center' }}>Contact Info</h2>
                            <ul>
                                <div class="flex flex-col pb-1">
                                    <dt class="mtext-gray-500 md:text-lg dark:text-gray-400">Email address</dt>
                                    <dd class="text-lg font-semibold">{profile?.email}</dd>
                                </div>
                                <div class="flex flex-col py-1">
                                    <dt class="text-gray-500 md:text-lg dark:text-gray-400">Home address</dt>
                                    <dd class="text-lg font-semibold">{profile?.address}</dd>
                                </div>
                                <div class="flex flex-col pt-1">
                                    <dt class=" text-gray-500 md:text-sm dark:text-gray-400">Phone number</dt>
                                    <dd class="text-lg font-semibold">+00 123 456 789 / +12 345 678</dd>
                                </div>
                                <hr></hr>
                                {profile?.rating === '0' &&
                                    'No Rating given yet'}
                                {profile?.rating !== '0' &&
                                    <h2>Overall Rating {profile?.rating}</h2>}
                            </ul>
                        </div>
                    </div>
                    {services &&
                        <div className="profile-services">
                            <ServiceCard services={services} />
                        </div>
                    }
                </div>
            </div>
            <div>
                <ServiceModal user={user} />
            </div>

        </>
    )
}

export default Profile