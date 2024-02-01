import React, { useState } from 'react';

const categories = [
    'Architectural Designers',
    'Bathroom Fitters',
    'Bricklayers',
    'Builders',
    'Carpenters & Joiners',
    'Carpet & Lino Fitters',
    'Chimney & Fireplace Specialists',
    'Conservatory Installers',
    'Conversion Specialists',
    'Damp Proofing Specialists',
    'Decking Specialists',
    'Demolition Specialists',
    'Driveway Pavers',
    'Electricians',
    'Extension Builders',
    'Fascias & Soffits Specialists',
    'Fencers',
    'Flooring Fitters',
    'Gardeners',
    'Gas Engineers',
    'Groundworkers',
    'Guttering Installers',
    'Handymen',
    'Heating Engineers',
    'Insulation Installers',
    'Kitchen Fitters',
    'Landscape Gardeners',
    'Locksmiths',
    'Loft Conversion Specialists',
    'New Home Builders',
    'Painters & Decorators',
    'Plasterers',
    'Plumbers',
    'Repointing Specialists',
    'Restoration & Refurb Specialists',
    'Roofers',
    'Security System Installers',
    'Stonemasons',
    'Tarmac Driveway Specialists',
    'Tilers',
    'Tradesmen',
    'Tree Surgeons',
    'Waste Clearance Specialists',
    'Window & Door Fitters',
];

const ServiceModal = ({ user, refreshServices }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [included, setIncluded] = useState([]);
    const [bp1, setbp1] = useState('');
    const [bp2, setbp2] = useState('');
    const [bp3, setbp3] = useState('');
    const [bp4, setbp4] = useState('');
    const [bp5, setbp5] = useState('');

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };

    async function createService() {
        try {
            const response = await fetch('http://localhost:4000/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    description: description,
                    cost: cost,
                    userId: user?.id,
                    category: category,
                    included: included
                }),
            });
            if (response.ok) {
                refreshServices()
                console.log('Successful');
                toggleModal();
            } else {
                console.log('Failed to create service');
            }
        } catch (error) {
            console.error('Error adding service', error);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        included.push(bp1,bp2,bp3,bp4,bp5)
        console.log(included);
        createService();
    };

    function mergeIncluded() {

    }
    return (
        <div>
            <button
                onClick={toggleModal}
                className="add-button block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                type="button"
            >
                Add Service
            </button>

            {modalVisible && (
                <div
                    id="crud-modal"
                    tabIndex="-1"
                    aria-hidden="true"
                    className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
                >
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-gray-700 rounded-lg shadow dark:bg-gray-700">
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Add New Service
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-black dark:hover:text-white"
                                    onClick={toggleModal}
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
                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="p-4 md:p-5"
                            >
                                <div className="grid gap-4 mb-4 grid-cols-2">
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="Type product name"
                                            required
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="price"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Price
                                        </label>
                                        <input
                                            type="number"
                                            name="price"
                                            id="price"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            placeholder="$2999"
                                            required
                                            onChange={(e) => setCost(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-span-2 sm:col-span-1">
                                        <label
                                            htmlFor="category"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Category
                                        </label>
                                        <select
                                            id="category"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                            onChange={(e) => setCategory(e.target.value)}
                                        >
                                            <option value="" disabled selected>
                                                Select category
                                            </option>
                                            {categories.map((categoryOption) => (
                                                <option key={categoryOption} value={categoryOption}>
                                                    {categoryOption}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Service Description
                                        </label>
                                        <textarea
                                            id="description"
                                            rows="4"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write product description here"
                                            onChange={(e) => setDescription(e.target.value)}
                                        ></textarea>
                                    </div>
                                    <div className="col-span-2">
                                        <label
                                            htmlFor="description"
                                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                        >
                                            Whats Included
                                        </label>
                                        <input
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write bullet point here"
                                            onChange={(e) => setbp1(e.target.value)}
                                        ></input>
                                        <input
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write bullet point here"
                                            onChange={(e) => setbp2(e.target.value)}

                                        ></input>
                                        <input
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write bullet point here"
                                            onChange={(e) => setbp3(e.target.value)}
                                        ></input>
                                        <input
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write bullet point here"
                                            onChange={(e) => setbp4(e.target.value)}
                                        ></input>
                                        <input
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Write bullet point here"
                                            onChange={(e) => setbp5(e.target.value)}
                                        ></input>
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                >
                                    <svg
                                        className="me-1 -ms-1 w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    Add new service
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ServiceModal;
