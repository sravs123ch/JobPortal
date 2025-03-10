
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Combobox } from '@headlessui/react';
// import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
// import MainContent from "../../MainContent";
// import { FaPlus } from "react-icons/fa";

// // Main component for job listings
// export const AddJobs  = (isNavbarOpen) => {
//   const navigate = useNavigate();
//   return (
   
//     <MainContent isNavbarOpen={isNavbarOpen}>
// <h1 className="text-center text-4xl font-semibold mb-4">
//   Add Jobs
// </h1>
    
//    </MainContent>
//   );
// };


// import React, { useState } from 'react';

// const AddJobs = () => {
//     const [jobData, setJobData] = useState({
//         title: '',
//         description: '',
//         jdDocumentUrl: '',
//         department: '',
//         addressId: '',
//         salaryRange: '',
//         experienceRequired: '',
//         jobType: 'Full-Time',
//         eduQualifications: '',
//         jobResponsibilities: '',
//         skillsRequired: '',
//         status: 'Open',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setJobData({ ...jobData, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Here you would typically send jobData to your backend API
//         console.log('Job Data Submitted:', jobData);
//         // Reset the form if needed
//         setJobData({
//             title: '',
//             description: '',
//             jdDocumentUrl: '',
//             department: '',
//             addressId: '',
//             salaryRange: '',
//             experienceRequired: '',
//             jobType: 'Full-Time',
//             eduQualifications: '',
//             jobResponsibilities: '',
//             skillsRequired: '',
//             status: 'Open',
//         });
//     };

//     return (
//         <div>
//             <h1>Add Job Listing</h1>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Title:</label>
//                     <input type="text" name="title" value={jobData.title} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Description:</label>
//                     <textarea name="description" value={jobData.description} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>JD Document URL:</label>
//                     <input type="url" name="jdDocumentUrl" value={jobData.jdDocumentUrl} onChange={handleChange} />
//                 </div>
//                 <div>
//                     <label>Department:</label>
//                     <input type="text" name="department" value={jobData.department} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Address ID:</label>
//                     <input type="number" name="addressId" value={jobData.addressId} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Salary Range:</label>
//                     <input type="text" name="salaryRange" value={jobData.salaryRange} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Experience Required:</label>
//                     <input type="text" name="experienceRequired" value={jobData.experienceRequired} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Job Type:</label>
//                     <select name="jobType" value={jobData.jobType} onChange={handleChange} required>
//                         <option value="Full-Time">Full-Time</option>
//                         <option value="Part-Time">Part-Time</option>
//                         <option value="Contract">Contract</option>
//                         <option value="Internship">Internship</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label>Educational Qualifications:</label>
//                     <input type="text" name="eduQualifications" value={jobData.eduQualifications} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Job Responsibilities:</label>
//                     <textarea name="jobResponsibilities" value={jobData.jobResponsibilities} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Skills Required:</label>
//                     <textarea name="skillsRequired" value={jobData.skillsRequired} onChange={handleChange} required />
//                 </div>
//                 <div>
//                     <label>Status:</label>
//                     <select name="status" value={jobData.status} onChange={handleChange}>
//                         <option value="Open">Open</option>
//                         <option value="Closed">Closed</option>
//                     </select>
//                 </div>
//                 <button type="submit">Add Job</button>
//             </form>
//         </div>
//     );
// };

// export default AddJobs;

// import React, { useState } from 'react';

// const AddJobs = () => {
//     const [jobData, setJobData] = useState({
//         title: '',
//         description: '',
//         jdDocumentUrl: '',
//         department: '',
//         addressId: '',
//         salaryRange: '',
//         experienceRequired: '',
//         jobType: 'Full-Time',
//         eduQualifications: '',
//         jobResponsibilities: '',
//         skillsRequired: '',
//         status: 'Open',
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setJobData({ ...jobData, [name]: value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Here you would typically send jobData to your backend API
//         console.log('Job Data Submitted:', jobData);
//         // Reset the form if needed
//         setJobData({
//             title: '',
//             description: '',
//             jdDocumentUrl: '',
//             department: '',
//             addressId: '',
//             salaryRange: '',
//             experienceRequired: '',
//             jobType: 'Full-Time',
//             eduQualifications: '',
//             jobResponsibilities: '',
//             skillsRequired: '',
//             status: 'Open',
//         });
//     };

//     return (
//         <div className="max-w-2xl mx-auto p-4 border rounded-lg shadow-lg">
//             <h1 className="text-2xl font-bold text-center mb-4">Add Job Listing</h1>
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Title:</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={jobData.title}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Description:</label>
//                     <textarea
//                         name="description"
//                         value={jobData.description}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">JD Document URL:</label>
//                     <input
//                         type="url"
//                         name="jdDocumentUrl"
//                         value={jobData.jdDocumentUrl}
//                         onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Department:</label>
//                     <input
//                         type="text"
//                         name="department"
//                         value={jobData.department}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Address ID:</label>
//                     <input
//                         type="number"
//                         name="addressId"
//                         value={jobData.addressId}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Salary Range:</label>
//                     <input
//                         type="text"
//                         name="salaryRange"
//                         value={jobData.salaryRange}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Experience Required:</label>
//                     <input
//                         type="text"
//                         name="experienceRequired"
//                         value={jobData.experienceRequired}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Job Type:</label>
//                     <select
//                         name="jobType"
//                         value={jobData.jobType}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="Full-Time">Full-Time</option>
//                         <option value="Part-Time">Part-Time</option>
//                         <option value="Contract">Contract</option>
//                         <option value="Internship">Internship</option>
//                     </select>
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Educational Qualifications:</label>
//                     <input
//                         type="text"
//                         name="eduQualifications"
//                         value={jobData.eduQualifications}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Job Responsibilities:</label>
//                     <textarea
//                         name="jobResponsibilities"
//                         value={jobData.jobResponsibilities}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Skills Required:</label>
//                     <textarea
//                         name="skillsRequired"
//                         value={jobData.skillsRequired}
//                         onChange={handleChange}
//                         required
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     />
//                 </div>
//                 <div>
//                     <label className="block text-sm font-medium mb-1">Status:</label>
//                     <select
//                         name="status"
//                         value={jobData.status}
//                         onChange={handleChange}
//                         className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     >
//                         <option value="Open">Open</option>
//                         <option value="Closed">Closed</option>
//                     </select>
//                 </div>
//                 <button
//                     type="submit"
//                     className="w-full p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//                 >
//                     Add Job
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AddJobs;

import React, { useState } from 'react';
import MainContent from "../../MainContent";

const AddJobs = (isNavbarOpen) => {
    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        jdDocumentUrl: '',
        department: '',
        addressId: '',
        salaryRange: '',
        experienceRequired: '',
        jobType: 'Full-Time',
        eduQualifications: '',
        jobResponsibilities: '',
        skillsRequired: '',
        status: 'Open',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJobData({ ...jobData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send jobData to your backend API
        console.log('Job Data Submitted:', jobData);
        // Reset the form if needed
        setJobData({
            title: '',
            description: '',
            jdDocumentUrl: '',
            department: '',
            addressId: '',
            salaryRange: '',
            experienceRequired: '',
            jobType: 'Full-Time',
            eduQualifications: '',
            jobResponsibilities: '',
            skillsRequired: '',
            status: 'Open',
        });
    };

    return (
        // <div className="max-w-2xl mx-auto p-4 border rounded-lg shadow-lg mt-14">
        <MainContent isNavbarOpen={isNavbarOpen}>
            <h1 className="text-2xl font-bold text-center mb-4">Add Job Listing</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={jobData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                  
                    <div>
                        <label className="block text-sm font-medium mb-1">JD Document URL:</label>
                        <input
                            type="url"
                            name="jdDocumentUrl"
                            value={jobData.jdDocumentUrl}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                
                    <div>
                        <label className="block text-sm font-medium mb-1">Address ID:</label>
                        <input
                            type="number"
                            name="addressId"
                            value={jobData.addressId}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Salary Range:</label>
                        <input
                            type="text"
                            name="salaryRange"
                            value={jobData.salaryRange}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Experience Required:</label>
                        <input
                            type="text"
                            name="experienceRequired"
                            value={jobData.experienceRequired}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Job Type:</label>
                        <select
                            name="jobType"
                            value={jobData.jobType}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Full-Time">Full-Time</option>
                            <option value="Part-Time">Part-Time</option>
                            <option value="Contract">Contract</option>
                            <option value="Internship">Internship</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Educational Qualifications:</label>
                        <input
                            type="text"
                            name="eduQualifications"
                            value={jobData.eduQualifications}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Status:</label>
                        <select
                            name="status"
                            value={jobData.status}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Department:</label>
                        <input
                            type="text"
                            name="department"
                            value={jobData.department}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Job Responsibilities:</label>
                        <textarea
                            name="jobResponsibilities"
                            value={jobData.jobResponsibilities}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description:</label>
                        <textarea
                            name="description"
                            value={jobData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Skills Required:</label>
                        <textarea
                            name="skillsRequired"
                            value={jobData.skillsRequired}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                  
                </div>
                <button
                    type="submit"
                    className="justify-between items-end w-50% p-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Add Job
                </button>
            </form>
        {/* </div> */}
        </MainContent>
    );
};

export default AddJobs;