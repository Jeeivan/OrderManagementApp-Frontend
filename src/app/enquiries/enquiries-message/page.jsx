'use client'
import Navbar from "@/components/navbar/page"
import { useState, useEffect } from "react";
import { UserButton, useClerk } from "@clerk/nextjs";

function enquiresMessages() {
    const customerId = localStorage.getItem("customerId");
    const businessId = localStorage.getItem("businessId");
    const customerName = localStorage.getItem("customerName");
    const [currentDate, setCurrentDate] = useState(new Date())
    const [messages, setMessages] = useState(false)
    const [newMessage, setNewMessage] = useState([])
    const [previousMessage, setPreviousMessage] = useState({})
    const [profile, setProfile] = useState({})
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

        async function getMessages() {
            try {
                const response = await fetch(`http://localhost:4000/messages/${[customerId, businessId]}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                setMessages(result[0].chat)
            } catch (error) {
                console.log("Messages not found", error);
            }
        }
        getMessages()

        const intervalId = setInterval(() => {
            setCurrentDate(new Date());
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [user])

    async function createMessage() {
        try {
            const response = await fetch(`http://localhost:4000/messages`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    bProfile: businessId,
                    cProfile: customerId,
                    chat: newMessage
                }),
            })
        } catch (error) {
            console.error("Error adding message", error);
        }
    }

    async function addNewMessage() {
        try {
            const response = await fetch(`http://localhost:4000/messages/${[customerId, businessId]}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat: messages
                }),
            })
        } catch (error) {
            console.error("Error adding message", error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(messages);
        if (!messages) {
            console.log('hi');
            createMessage();
        } else {
            console.log(newMessage);
            let allMessages = messages.push(newMessage)
            setMessages(allMessages)
            addNewMessage();
        }
    };

    function toTime(date) {
        const dateString = date;
        const dateObject = new Date(dateString);
        const hours = dateObject.getHours();
        const minutes = dateObject.getMinutes()
        if (minutes === 2 | minutes === 3 | minutes === 4 | minutes === 5 | minutes === 6 | minutes === 7 | minutes === 8 | minutes === 9)
        return (hours+':0'+minutes)
        else 
        return (hours+':'+minutes)
    }

    return (
        <div>
            <Navbar />
            <div className="message-container">
                <div className="message-header">
                    {profile.owner ? <h1>{customerName}</h1> : ''}
                </div>
                {messages &&
                    messages.map((message, index) => (
                        <div key={index}>
                            {profile.firstName ?
                                <div>
                                    {message.bProfile ?
                                        <div class="flex items-start gap-2.5">
                                            <div class="flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                <div class="flex items-center space-x-2 rtl:space-x-reverse">
                                                    <span class="text-sm font-semibold text-gray-900 dark:text-white"></span>
                                                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{toTime(message.currentDate)}</span>
                                                </div>
                                                <p class="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message.bProfile}</p>
                                                <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                                            </div>
                                        </div>
                                        :
                                        <div style={{marginBottom: '2vh',display: "flex", justifyContent: "flex-end"}} class="flex items-end gap-2.5">
                                            <div class="message-box flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                <div class="message-inner flex items-center space-x-2 rtl:space-x-reverse">
                                                    <span class="text-sm font-semibold text-gray-900 dark:text-white">{customerName}</span>
                                                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{toTime(message.currentDate)}</span>
                                                </div>
                                                <p class="message-inner text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message.cProfile}</p>
                                                <span class="message-inner text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                                            </div>
                                        </div>}
                                </div>
                                :
                                <div>
                                    {message.bProfile ?
                                        <div style={{marginBottom: '2vh',display: "flex", justifyContent: "flex-end"}} class="flex items-start gap-2.5">
                                            <div class="message-box flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                <div class="message-inner flex items-center space-x-2 rtl:space-x-reverse">
                                                    <span class="text-sm font-semibold text-gray-900 dark:text-white">{profile?.businessName}</span>
                                                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{toTime(message.currentDate)}</span>
                                                </div>
                                                <p class="message-inner text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message.bProfile}</p>
                                                <span class="message-inner text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                                            </div>
                                        </div>
                                        :
                                        <div>
                                            <div className="message-box flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                                                <div class="message-inner flex items-center space-x-2 rtl:space-x-reverse">
                                                    <span class="text-sm font-semibold text-gray-900 dark:text-white">{customerName}</span>
                                                    <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{toTime(message.currentDate)}</span>
                                                </div>
                                                <p class="message-inner text-sm font-normal py-2.5 text-gray-900 dark:text-white">{message.cProfile}</p>
                                                <span class="message-inner text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                                            </div>
                                        </div>}
                                </div>
                            }
                        </div>
                    ))}
            </div>
            <form onSubmit={handleSubmit}>
                {profile?.owner ?
                    <div className='message-input'>
                        <input type="text" onChange={(e) => setNewMessage({ bProfile: e.target.value, currentDate })} />
                    </div> :
                    <div className='message-input'>
                        <input type="text" onChange={(e) => setNewMessage({ cProfile: e.target.value, currentDate })} />
                    </div>}
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default enquiresMessages
