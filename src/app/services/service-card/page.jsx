import React, { useState, useEffect } from 'react';
import ServiceEditModal from './service-edit-modal/page';
import ServiceDeleteModal from './service-delete-modal/page';

function ServiceCard({ services, name }) {
    return (
        <div style={{ display: 'flex' }}>
            {services.map((service, index) => (
                <div style={{ marginRight: '10vh' }} key={index}>
                    <div style={{width: '50vh'}}class="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
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
                        <div className='editDelete'>
                        <ServiceDeleteModal serviceId={service._id} />
                        <ServiceEditModal serviceId={service._id} />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ServiceCard;