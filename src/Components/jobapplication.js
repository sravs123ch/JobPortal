// import React from "react";
// import { useNavigate } from "react-router-dom";

// // Named export for the jobs array
// export const jobs = [
//   {
//     id: 1,
//     title: "Software Engineer",
//     company: "TechCorp Inc.",
//     location: "New York, NY",
//     type: "Full-Time",
//     salary: "$120,000 - $140,000",
//     postedDate: "2025-01-20",
//   },
//   {
//     id: 2,
//     title: "Frontend Developer",
//     company: "Designify Studio",
//     location: "San Francisco, CA",
//     type: "Part-Time",
//     salary: "$60,000 - $80,000",
//     postedDate: "2025-01-18",
//   },
//   {
//     id: 3,
//     title: "Data Analyst",
//     company: "DataWave Solutions",
//     location: "Chicago, IL",
//     type: "Contract",
//     salary: "$70,000 - $90,000",
//     postedDate: "2025-01-15",
//   },
//   {
//     id: 4,
//     title: "Project Manager",
//     company: "BuildWell Co.",
//     location: "Austin, TX",
//     type: "Full-Time",
//     salary: "$100,000 - $120,000",
//     postedDate: "2025-01-10",
//   },
//   {
//     id: 5,
//     title: "UI/UX Designer",
//     company: "PixelPerfect Design",
//     location: "Seattle, WA",
//     type: "Remote",
//     salary: "$85,000 - $100,000",
//     postedDate: "2025-01-05",
//   },
// ];

// // Main component for job listings
// export const Jobs = () => {
//   const navigate = useNavigate();

//   // Group jobs by company
//   const groupedJobs = jobs.reduce((acc, job) => {
//     if (!acc[job.company]) {
//       acc[job.company] = [];
//     }
//     acc[job.company].push(job);
//     return acc;
//   }, {});

//   return (
//     <div style={{ fontFamily: "Arial, sans-serif", margin: "100px", marginLeft: "200px" }}>
//       {Object.entries(groupedJobs).map(([company, companyJobs], index) => (
//         <div
//           key={index}
//           className="bg-white shadow-lg rounded-lg p-6 mb-6"
//           style={{
//             border: "1px solid #ddd",
//             padding: "20px",
//             marginBottom: "20px",
//           }}
//         >
//           <h2 className="text-xl font-bold mb-4">{company}</h2>
//           {companyJobs.map((job) => (
//             <div
//               key={job.id}
//               className="p-4 border-b last:border-b-0"
//               style={{ marginBottom: "10px" }}
//             >
//               <h3 className="text-lg font-semibold">{job.title}</h3>
//               <div className="flex flex-wrap items-center space-x-4">
//   <p className="text-gray-700">
//     <strong>Location:</strong> {job.location}
//   </p>
//   <p className="text-gray-700">
//     <strong>Type:</strong> {job.type}
//   </p>
//   <p className="text-gray-700">
//     <strong>Salary:</strong> {job.salary}
//   </p>
//   <p className="text-gray-700">
//     <strong>Posted Date:</strong> {job.postedDate}
//   </p>
// </div>

// <button
//   className="text-blue-500 hover:underline mt-4"
//   onClick={() => navigate(`/details/${index}`)}
// >
//   Apply Now
// </button>

//             </div>
//           ))}

//         </div>
//       ))}
//     </div>
//   );
// };


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Combobox } from '@headlessui/react';
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/20/solid';
import MainContent from "../MainContent";

// Named export for the jobs array
export const jobs = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp Inc.",
    location: "New York, NY",
    type: "Full-Time",
    salary: "$120,000 - $140,000",
    postedDate: "2025-01-20",
  },
  {
    id: 2,
    title: "Frontend Developer",
    company: "Designify Studio",
    location: "San Francisco, CA",
    type: "Part-Time",
    salary: "$60,000 - $80,000",
    postedDate: "2025-01-18",
  },
  {
    id: 3,
    title: "Data Analyst",
    company: "DataWave Solutions",
    location: "Chicago, IL",
    type: "Contract",
    salary: "$70,000 - $90,000",
    postedDate: "2025-01-15",
  },
  {
    id: 4,
    title: "Project Manager",
    company: "BuildWell Co.",
    location: "Austin, TX",
    type: "Full-Time",
    salary: "$100,000 - $120,000",
    postedDate: "2025-01-10",
  },
  {
    id: 5,
    title: "UI/UX Designer",
    company: "PixelPerfect Design",
    location: "Seattle, WA",
    type: "Remote",
    salary: "$85,000 - $100,000",
    postedDate: "2025-01-05",
  },
];

// Main component for job listings
export const Jobs = (isNavbarOpen) => {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // Group jobs by company
  const groupedJobs = jobs.reduce((acc, job) => {
    if (!acc[job.company]) {
      acc[job.company] = [];
    }
    acc[job.company].push(job);
    return acc;
  }, {});

  // Example: Dummy country and role options (You can modify this with actual data)
  const countries = ["USA", "Canada", "UK"];
  const roles = ["Developer", "Designer", "Manager"];

  // Filter function for jobs based on selected country and role
  const filterJobs = (companyJobs) => {
    return companyJobs.filter((job) => {
      const countryMatch = selectedCountry ? job.location.includes(selectedCountry) : true;
      const roleMatch = selectedRole ? job.title.toLowerCase().includes(selectedRole.toLowerCase()) : true;
      return countryMatch && roleMatch;
    });
  };

  return (
    // <div style={{ fontFamily: "Arial, sans-serif", margin: "100px", marginLeft: "200px",marginTop:"40px", }}>
    // <div
    //   className={`transition-all duration-300 ${
    //     isNavbarOpen ? "ml-60" : "ml-16"
    //   } mt-12 p-4`}
    // >
    <MainContent isNavbarOpen={isNavbarOpen}>
<h1 className="text-center text-4xl font-semibold mb-4">
  Jobs List Page
</h1>

<div className="w-full xl:w-3/4 flex justify-between space-x-60 mb-4 ml-40">
  {/* Country Dropdown */}
  <div className="w-1/2">
    <Combobox value={selectedCountry} onChange={setSelectedCountry}>
      <div className="relative mt-1">
        <Combobox.Input
          id="country"
          className="block w-full rounded-md border py-2 px-4 shadow-sm sm:text-sm mt-2 mb-1"
          displayValue={(country) => country || ""}
          placeholder="Filter Based on Country"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {countries.map((country) => (
            <Combobox.Option
              key={country}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-3 pr-9 ${
                  active ? "bg-indigo-600 text-white" : "text-gray-900"
                }`
              }
              value={country}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}
                  >
                    {country}
                  </span>
                  {selected && (
                    <span
                      className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                        active ? "text-white" : "text-indigo-600"
                      }`}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  </div>

  {/* Role Dropdown */}
  <div className="w-1/2 ml-44">
  
    <Combobox value={selectedRole} onChange={setSelectedRole}>
      <div className="relative mt-1">
        <Combobox.Input
          id="role"
          className="block w-full rounded-md border py-2 px-4 shadow-sm sm:text-sm mt-2 mb-1"
          displayValue={(role) => role || ""}
          placeholder="Filter Based on Role"
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>
        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {roles.map((role) => (
            <Combobox.Option
              key={role}
              className={({ active }) =>
                `relative cursor-default select-none py-2 pl-3 pr-9 ${
                  active ? "bg-indigo-600 text-white" : "text-gray-900"
                }`
              }
              value={role}
            >
              {({ selected, active }) => (
                <>
                  <span
                    className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}
                  >
                    {role}
                  </span>
                  {selected && (
                    <span
                      className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                        active ? "text-white" : "text-indigo-600"
                      }`}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  </div>
</div>

      {/* Iterate over grouped jobs and display them */}
      {Object.entries(groupedJobs).map(([company, companyJobs], index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 mb-6"
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          <h2 className="text-xl font-bold mb-4">{company}</h2>

          {/* Map over the filtered jobs */}
          {filterJobs(companyJobs).map((job) => (
            <div
              key={job.id}
              className="p-4 border-b last:border-b-0"
              style={{ marginBottom: "10px" }}
            >
              <h3 className="text-lg font-semibold">{job.title}</h3>
              <div className="flex flex-wrap items-center space-x-4">
                <p className="text-gray-700">
  <strong>Location:</strong> {job.location} <span className="mx-2">|</span>
</p>
<p className="text-gray-700">
  <strong>Type:</strong> {job.type} <span className="mx-2">|</span>
</p>
<p className="text-gray-700">
  <strong>Salary:</strong> {job.salary} <span className="mx-2">|</span>
</p>
<p className="text-gray-700">
  <strong>Posted Date:</strong> {job.postedDate}
</p>

              </div>

              <button
                className="text-blue-500 hover:underline mt-4"
                onClick={() => navigate(`/details/${index}`)}
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      ))}
   </MainContent>
  );
};
