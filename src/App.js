
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


import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; // import useLocation
import JobPortal from './Components/jobportal'; // Example component
import { Jobs } from "./Components/jobs";
import { JobDetails } from "./Components/jobdetails";
import Navigation from './Navigation/navbar'; 

import "./index.css";

const App = () => {
  return (
    <Router>
      <AppWithNavigation />
    </Router>
  );
};

// Create a new component to handle the navigation logic inside the Router
const AppWithNavigation = () => {
  const location = useLocation();
  // const showNavigation = location.pathname !== "/";

  return (
    <div className="App flex flex-col min-h-screen">
      {/* {showNavigation && <Navigation />} */}
      <main className="flex-grow p-0 bg-gray-100">
        <Routes>
          <Route path="/jobportal" element={<JobPortal />} />
          <Route path="/" element={<JobPortal />} />

          <Route path="/jobs" element={<Jobs />} />
          <Route path="/details/:companyId" element={<JobDetails />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
