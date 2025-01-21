import React from "react";
import { useParams } from "react-router-dom";
import { jobs } from "./jobs";
import { useNavigate } from 'react-router-dom';

export const JobDetails = () => {
  const { companyId } = useParams();
  const navigate = useNavigate();

  // Filter jobs based on the company ID
  const groupedJobs = jobs.reduce((acc, job) => {
    if (!acc[job.company]) {
      acc[job.company] = [];
    }
    acc[job.company].push(job);
    return acc;
  }, {});

  const company = Object.keys(groupedJobs)[companyId];
  const companyJobs = groupedJobs[company];

  if (!companyJobs) {
    return <p>No jobs found for this company.</p>;
  }

return (
    // <div style={{ fontFamily: "Arial, sans-serif", margin: "100px", marginLeft: "200px" }}>
    //   <h2 className="text-2xl font-bold mb-6">{company}</h2>
    //   {companyJobs.map((job) => (
    //     <div
    //       key={job.id}
    //       className="bg-white shadow-lg rounded-lg p-6 mb-6"
    //       style={{
    //         border: "1px solid #ddd",
    //         padding: "20px",
    //         marginBottom: "20px",
    //       }}
    //     >
    //       <h3 className="text-lg font-semibold">{job.title}</h3>
          
    //       {/* Flexbox container for job details */}
    //       <div className="flex space-x-4 mb-4">
    //         <p>
    //           <strong>Location:</strong> {job.location}
    //         </p>
    //         <p>
    //           <strong>Type:</strong> {job.type}
    //         </p>
    //         <p>
    //           <strong>Salary:</strong> {job.salary}
    //         </p>
    //         <p>
    //           <strong>Posted Date:</strong> {job.postedDate}
    //         </p>
    //       </div>
  
    //       {/* Separator line */}
    //       <div className="border-t border-gray-300 my-4"></div>
  
    //       {/* Buttons */}
    //       <div className="flex justify-between">
    //         <button className="bg-blue-500 text-white py-2 px-4 rounded-md"
           
    //         onClick={() => navigate('/jobs')}
    //         >View All Jobs</button>
    //         {/* <button className="bg-green-500 text-white py-2 px-4 rounded-md">Apply Now</button> */}
    //         <button
    //         className="bg-green-500 text-white py-2 px-4 rounded-md"
    //         onClick={() => navigate('/jobportal')}
    //       >
    //         Apply Now
    //       </button>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div style={{ fontFamily: "Arial, sans-serif", margin: "100px", marginLeft: "200px" }}>
  <h2 className="text-2xl font-bold mb-6">{company}</h2>
  {companyJobs.map((job) => (
    <div
      key={job.id}
      className="bg-white shadow-lg rounded-lg p-6 mb-6"
      style={{
        border: "1px solid #ddd",
        padding: "20px",
        marginBottom: "20px",
      }}
    >
      <h3 className="text-lg font-semibold">{job.title}</h3>

      {/* Flexbox container for job details */}
      <div className="flex space-x-4 mb-4">
        <p>
          <strong>Location:</strong> {job.location}<span className="mx-2">|</span>
        </p>
        <p>
          <strong>Type:</strong> {job.type}<span className="mx-2">|</span>
        </p>
        <p>
          <strong>Salary:</strong> {job.salary}<span className="mx-2">|</span>
        </p>
        <p>
          <strong>Posted Date:</strong> {job.postedDate}
        </p>
      </div>
  {/* Buttons */}
  <div className="flex justify-between">
        <button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={() => navigate('/jobs')}>
          View All Jobs
        </button>
        <button className="bg-green-500 text-white py-2 px-4 rounded-md" onClick={() => navigate('/jobportal')}>
          Apply Now
        </button>
      </div>
      {/* Separator line */}
      <div className="border-t border-gray-300 my-4"></div>

        <div className="mb-4">
        <h4 className="text-xl font-semibold mb-2">Job Description:</h4>
        <p>
          We are seeking two Senior Software Development Engineers in Test (SDETs). You will be responsible for finding, analyzing, and reporting defects and other software issues. Your primary focus will be manual testing as well as automated testing. The successful candidate possesses a strong sense of curiosity, demonstrates attention to detail, problem-solving skills, and an interest in continuous learning.
          <br /><br />
          5+ years experience with object-oriented programming languages and techniques C#, Java, or TypeScript.
          <br /><br />
          5+ years of experience developing and maintaining test automation for Web & Mobile Applications and backend test automation.
        </p>
      </div>

      {/* Job Responsibilities */}
      <div className="mb-4">
        <h4 className="text-xl font-semibold mb-2">Job Responsibilities:</h4>
        <ul className="list-disc pl-5">
          <li>Work closely and collaboratively with engineers and product managers to ensure the delivery of the high-quality product.</li>
          <li>Improve the customers’ experiences by understanding what’s important, measuring how we’re doing, and driving testing priorities to improve.</li>
          <li>Actively participate in team sprint planning and refinement meetings.</li>
          <li>Perform functional, regression, and smoke testing on new features.</li>
        </ul>
      </div>
    
    </div>
  ))}
</div>

  );
  
};
