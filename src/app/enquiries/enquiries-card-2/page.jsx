'use client'

import { UserButton, useClerk } from "@clerk/nextjs";
import { useEffect, useState } from "react";
function EnquiriesCard2() {
    const [historyEnquiries, setHistoryEnquiries] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())
    const { user } = useClerk();

    useEffect(() => {
        if (user) {
            async function getEnquiries() {
                try {
                    const response = await fetch(`http://localhost:4000/enquiries/${user?.id}`, {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });
                    const result = await response.json();
                    setHistoryEnquiries(result.filter((enquiry) => enquiry?.active === false))
                } catch (error) {
                    console.log("Profile not found", error);
                }
            }
            getEnquiries()
        }

        // Update the current date every second (or as needed)
        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [user])

    function toDate(date) {
        const dateString = date;
        const dateObject = new Date(dateString);
        const formattedDate = dateObject.toLocaleString();
        if (currentDate.getMonth() === dateObject.getMonth()) {
            if (currentDate.getDate() === dateObject.getDate()) {
                return 'Today'
            } else if (parseInt(currentDate.getDate()) - parseInt(currentDate.getDate()) === 1) {
                return '1 day ago'
            } else {
                return (parseInt(currentDate.getDate()) - parseInt(currentDate.getDate())) + ' days ago'
            }
        } else if (parseInt(currentDate.getMonth()) - parseInt(dateObject.getMonth()) === 1) {
            return '1 month ago'
        } else {
            return parseInt(currentDate.getMonth()) - parseInt(dateObject.getMonth()) + ' months ago'
        }
    }

    return (
        <div>
            {historyEnquiries ?
                historyEnquiries.map((enquiry, index) => (
                    <div key={index}>
                        <div className="w-full max-w-sm bg-black border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ marginLeft: '15vh' }}>
                            <div className="flex justify-end px-4 pt-4">
                            </div>
                            <div className="flex flex-col items-center pb-10">
                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{enquiry?.customerName}</h5>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{toDate(enquiry?.date)}</span>
                                <br />
                                <h6 style={{color: "white"}}>Enquiry</h6>
                                <p style={{color: "white"}}>{enquiry?.message}</p>
                                <div className="flex mt-4 md:mt-6">
                                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Message</a>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
                : 'No Enquiries Yet!'
            }
        </div>
    )
}

export default EnquiriesCard2

