import React, { useState, useEffect } from 'react';

function CusServiceCard({ services, name, business }) {
    const [businessP, setBusinessP] = useState([]);

    useEffect(() => {
        async function getBusinessName(userId, index) {
            try {
                const response = await fetch(`http://localhost:4000/bProfile/${userId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const result = await response.json();
                // Update the businessP array with the new result
                setBusinessP((prevBusinessP) => {
                    const updatedBusinessP = [...prevBusinessP];
                    updatedBusinessP[index] = result;
                    return updatedBusinessP;
                });

            } catch (error) {
                console.log("Profile not found", error);
            }
        }
        services.forEach((service, index) => {
            getBusinessName(service.userId, index);
        });
    }, [services, name]);

    function fillEnquiry(service, index) {
        localStorage.setItem("title", service.title);
        localStorage.setItem("category", service.category);
        localStorage.setItem("description", service.description);
        localStorage.setItem("cost", service.cost);
        localStorage.setItem("name", businessP[index]?.businessName);
        localStorage.setItem("serviceId", service._id);
        localStorage.setItem("userId", service.userId);
        window.location.href = "/enquiries/enquiries-fill";
    }

    function profileLink(userId) {
        localStorage.setItem('userId', userId)
        window.location.href = "/view-businessprofile";
    }

    return (
        <div>
            {businessP &&
                // <div>
                //     {
                //         services.map((service, index) => (
                //             <div key={index}>
                //                 <div className="card-services">
                //                     <div className="container-services">
                //                         <h4><b>{name}</b></h4>
                //                         <button onClick={() => profileLink(service?.userId)}><p style={{ color: 'black' }}>{service.title}</p></button>
                //                         <p style={{ color: 'black' }}>{service.category}</p>
                //                         <p style={{ color: 'black' }}>{service.description}</p>
                //                         <div key={index}>{businessP[index]?.businessName}</div>
                //                         {!business && <button onClick={() => fillEnquiry(service, index)}>Enquire</button>}
                //                     </div>
                //                 </div>
                //             </div>

                //         ))
                //     }
                // </div>
            
                services.map((service, index) => (
                    <div key={index}>
                        <div class="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{height: '20vh', width: '100vh', marginBottom: '5vh'}}>
                            <span style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'row-reverse'}}><h2 onClick={() => profileLink(service?.userId)}><div key={index}>{businessP[index]?.businessName}</div></h2>
                            <h5>{service.title}</ h5>
                            <p style={{ color: 'black' }}>{service.category}</p>
                            </span>

                            <h5>Brief Description:</h5>
                            <p style={{ color: 'black' }}>{service.description}</p>
                            <div style={{marginLeft: '80vh', marginTop: '-6vh'}}> {!business && <button onClick={() => fillEnquiry(service, index)}>Enquire</button>}</div>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default CusServiceCard;
