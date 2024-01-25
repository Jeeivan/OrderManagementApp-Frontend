'use client'
import React from 'react'
import Navbar from '../../components/navbar/page'
import Footer from '../../components/footer/page'
import { useEffect, useState } from 'react'
import { UserButton, useClerk } from "@clerk/nextjs";
import ServiceCard from './service-card/page'
import ServiceModal from './service-modal/page'
import LoadingOverlay from '../../components/loading/page'
import CusServiceCard from './cus-service-card/page'

function Services() {
    const [profile, setProfile] = useState({});
    const [services, setServices] = useState([]);
    const [allServices, setAllServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clicked, setClicked] = useState(false);
    const [business, setBusiness] = useState(false);
    const [filteredServices, setFilteredServices] = useState(false);
    const { user } = useClerk();

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
                                    setBusiness(true)
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

            async function getAllServices() {
                try {
                    const response = await fetch(`http://localhost:4000/services`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const result = await response.json();
                    setAllServices(result)
                } catch (error) {
                    console.log("Services not found", error);
                }
            }
            getAllServices()
        }

        const loadingTimeout = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(loadingTimeout);

    }, [user]);

    function filterServices(category) {
        setClicked(true)
        setFilteredServices(allServices.filter((service) => service?.category === category))
    }



    return (
        <div className='services-home'>
            {loading && <LoadingOverlay />}
            <Navbar />
            {!user &&
                <div>
                    <div id="popup-modal" tabindex="-1" className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                    type="button"
                                    className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="popup-modal"
                                >
                                    <svg
                                        className="w-3 h-3"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 14 14"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                        />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                                <div className="p-4 md:p-5 text-center">
                                    <svg
                                        className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                        Login to view Services!
                                    </h3>
                                    <button
                                        onClick={() => window.location.href = "/login"}
                                        data-modal-hide="popup-modal"
                                        type="button"
                                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2"
                                    >
                                        Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
            <div style={{position: 'relative', display: 'flex', flexDirection: 'column', zIndex: '1'}}>
            <aside id="default-sidebar"  class="w-60 h-100 transition-transform -translate-x-full sm:translate-x-0 absolute left-0 top-0 bottom-0 bg-gray-400" aria-label="Sidebar" >
                <div class="h-full px-3 py-4 bg-gray-400 ">
                    <ul class="space-y-2 font-medium">
                        <h1 style={{ color: 'white', fontSize: '3vh' }}>Filter By Category</h1>
                        <li>
                            {allServices.map((service, index) => (
                                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input id="filter-radio-example-1" type="radio" value="" onClick={() => filterServices(service?.category)} name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="filter-radio-example-1" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{service?.category}</label>
                                </div>
                            ))}
                            {clicked &&
                                <div class="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                    <input id="filter-radio-example-1" type="radio" value="" onClick={() => setClicked(false)} name="filter-radio" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                    <label for="filter-radio-example-1" class="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">All</label>
                                </div>
                            }
                        </li>
                    </ul>
                </div>
            </aside>

            {/* {profile?.owner &&
                <main className='services-main'>
                    <h1 className='services-title'>Services {profile?.businessName} provides</h1>
                    <div className='service-cards'>
                        {services &&
                            <ServiceCard services={services} name={profile?.businessName} />
                        }
                    </div>
                    <ServiceModal user={user} className='service-modal' />
                </main>} */}
            <main className='services-main' style={{zIndex: '-1'}}>
                <h1 style={{marginRight: '40vh'}}>All Services</h1>
                <div classname='service-cards'>
                    {!clicked ?
                        allServices &&
                        <ServiceCard services={allServices} business={business} profile={profile} />
                        :
                        <ServiceCard services={filteredServices} business={business} profile={profile} />
                    }
                </div>
            </main>
            <div style={{marginTop: '20vh', zIndex: '2'}}>
                <Footer />
            </div>
        </div>
        </div>
    );
}

export default Services
