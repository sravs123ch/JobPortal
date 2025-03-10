// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import JobPortal from './Components/jobportal'; // Example component
// import { Jobs } from "./Components/jobs";
// import { JobDetails } from "./Components/jobdetails";
// import Navigation from './Navigation/navbar';

// import { useLocation } from "react-router-dom";
// import "./index.css";

// const App = () => {
//   const location = useLocation();
//   const showNavigation = location.pathname !== "/" ;
//   return (
//     <div className="App flex flex-col min-h-screen">
//     {showNavigation && <Navigation />}
//     <main className="flex-grow p-0 bg-gray-100">
//     <Router>
//       <Routes>
//            <Route path="/jobportal" element={<JobPortal />} />
//            <Route path="/jobs" element={<Jobs />} />
//            <Route path="/details/:companyId" element={<JobDetails />} />
//          </Routes>
//     </Router>
//     </main>
//     </div>
//   );
// };

// export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // import useLocation
// import JobPortal from './Components/jobportal'; // Example component
// import { Jobs } from "./Components/jobs";
// import { JobDetails } from "./Components/jobdetails";
// import Navigation from './Navigation/navbar';
// import MainContent from "./MainContent";
// import "./index.css";

// const App = () => {
//   return (
//     <Router>
//       <AppWithNavigation />
//     </Router>
//   );
// };

// // Create a new component to handle the navigation logic inside the Router
// const AppWithNavigation = () => {
//   const location = useLocation();
//   const showNavigation = location.pathname !== "/";
//   const [isNavbarOpen, setIsNavbarOpen] = useState(false);

//   return (
//     <div className="App flex flex-col min-h-screen">
//       {showNavigation && <Navigation />}
//       <main className="flex-grow p-0 bg-gray-100">
//         <Routes>
//           <Route path="/jobportal" element={<JobPortal  isNavbarOpen={isNavbarOpen}/>} />
//           <Route path="/" element={<JobPortal  isNavbarOpen={isNavbarOpen}/>} />

//           <Route path="/jobs" element={<Jobs  isNavbarOpen={isNavbarOpen}/>} />
//           <Route path="/details/:companyId" element={<JobDetails  isNavbarOpen={isNavbarOpen}/>} />
//         </Routes>
//       </main>
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navigation from "./Navigation/navbar";
import JobPortal from "./Components/jobportal";
import { Jobs } from "./Components/jobapplication";
import { JobDetails } from "./Components/jobdetails";
import { JobsList } from "./Components/Jobs/jobslist";
// import { AddJobs } from "./Components/Jobs/AddJobs";
import AddJobs from './Components/Jobs/AddJobs'; 

const App = () => {
  return (
    <Router>
      <AppWithNavigation />
    </Router>
  );
};

const AppWithNavigation = () => {
  const location = useLocation();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const showNavigation = location.pathname !== "/";

  return (
    <div className="App flex flex-col min-h-screen">
      {showNavigation && (
        <Navigation
          isNavbarOpen={isNavbarOpen}
          toggleNavbar={() => setIsNavbarOpen(!isNavbarOpen)}
        />
      )}
      <main
        className={`flex-grow bg-gray-100 transition-all duration-300 ${
          isNavbarOpen ? "ml-60" : "ml-16"
        }`}
      >
        <Routes>
          <Route
            path="/jobportal"
            element={<JobPortal isNavbarOpen={isNavbarOpen} />}
          />
          <Route path="/" element={<JobPortal isNavbarOpen={isNavbarOpen} />} />
          <Route path="/jobs" element={<Jobs isNavbarOpen={isNavbarOpen} />} />
          <Route
            path="/jobslist"
            element={<JobsList isNavbarOpen={isNavbarOpen} />}
          />
          <Route
            path="/addjobs"
            element={<AddJobs isNavbarOpen={isNavbarOpen} />}
          />
          <Route
            path="/details/:companyId"
            element={<JobDetails isNavbarOpen={isNavbarOpen} />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
