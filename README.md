## Order Management App

![screenshot of website](example.png)

## Task Description

I collaborated with a colleague to enhance their full-stack application by making it further dynamic. Specifically, we focused on ensuring that the profile page updates seamlessly in response to any additions, edits, or deletions of services, thereby optimizing the user experience and ensuring accurate representation of the profile's content.

## Build Process

The main part of the development I started with was making a function that would fetch the latest services so that this could be called upon when a user creates, edits or deletes a service on their profile.

```
    const refreshServices = async () => {
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
                console.log("successfully fetched services")
            }
        } catch (error) {
            console.log("Service not found", error);
        }
    }
```

I made sure to carefully read through the file structure to see the different paths for the pages as the edit and delete functionality of the page were in their own seperate files, which meant I needed to be able to pass the function above as a prop to these.

```
            {services &&
                        <div className="profile-services" style={{marginRight: '16vh'}}>
                            <ServiceCard services={services} refreshServices={refreshServices}/>
                        </div>
                    }
                    <div style={{marginTop: '18vh',marginRight: '25vh', display: 'flex', alignItems: "center", justifyContent: "center"}}>
            <ServiceModal user={user} refreshServices={refreshServices}/>
```

## Wins

I am pleased with how I was able to pass my function as a prop to the corresponding files which gave me good practice of utilising the react framework in order to make sure I am not repeating my code.

```
    function ServiceDeleteModal({ serviceId, refreshServices }) {
    const [modalVisible, setModalVisible] = useState(false
    
    const toggleModal = () => {
        setModalVisible(!modalVisible);
        console.log('modal toggled');
    };

    const deleteService = async () => {
        try {
            await fetch(`http://localhost:4000/services/${serviceId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toggleModal();
            refreshServices()
        } catch (error) {
            console.log("Couldn't delete not found", error);
        }
    };
    const toggleModal = () => {
        setModalVisible(!modalVisible);
        console.log('modal toggled');
    };

    const deleteService = async () => {
        try {
            await fetch(`http://localhost:4000/services/${serviceId}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            toggleModal();
            refreshServices()
        } catch (error) {
            console.log("Couldn't delete not found", error);
        }
    };

```
