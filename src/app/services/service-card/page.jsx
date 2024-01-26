import React, { useState, useEffect } from 'react';
import ServiceEditModal from './service-edit-modal/page';
import ServiceDeleteModal from './service-delete-modal/page';
import { UserButton, useClerk } from "@clerk/nextjs";
import LoadingOverlay from '../../../components/loading/page';

function ServiceCard({ services, name, refreshServices}) {
    const { user } = useClerk();
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState({})

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
                        // if (!business) {
                        //     window.location.href = "/complete-profile"
                        // } else {
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
                                            window.location.href = "/complete-businessprofile";
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
        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        // Clean up the timeout to prevent memory leaks
        return () => clearTimeout(loadingTimeout);
    }, [user]);

    function fillEnquiry(service, index) {
        localStorage.setItem("title", service.title);
        localStorage.setItem("category", service.category);
        localStorage.setItem("description", service.description);
        localStorage.setItem("cost", service.cost);
        localStorage.setItem("serviceId", service._id);
        localStorage.setItem("userId", service.userId);
        window.location.href = "/enquiries/enquiries-fill";
    }

    return (
        <div className='service-card-all'>
            {services.map((service, index) => (
                <div style={{ marginRight: '10vh' }} key={index}>
                    <div style={{ width: '50vh' }} class="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                        <h5 class="mb-4 text-xl font-medium text-black dark:text-gray-400">{service.title}</h5>
                        <div class="flex items-baseline text-black dark:text-white">
                            <span class="text-3xl font-semibold">£</span>
                            <span class="text-5xl font-extrabold tracking-tight">{service.cost}</span>
                            <span class="ms-1 text-xl font-normal text-gray-500 dark:text-gray-400">/m²</span>
                        </div>
                        {service.included.map((include, index) => (
                            <div key={index}>
                                <ul role="list" class="space-y-5 my-7">
                                    <li class="flex items-center">
                                        <svg class="flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                        </svg>
                                        <span class="text-base font-normal leading-tight text-gray-500 dark:text-gray-400 ms-3">{include}</span>
                                    </li>
                                </ul>
                            </div>
                        ))}
                        {profile?.owner ?
                            <div className='editDelete'>
                                <ServiceDeleteModal serviceId={service._id} refreshServices={refreshServices}/>
                                <ServiceEditModal serviceId={service._id} refreshServices={refreshServices}/>
                            </div>
                        :
                        <button onClick={() => fillEnquiry(service, index)}>Enquire</button> }
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ServiceCard;