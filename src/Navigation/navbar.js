import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import {
  HiOutlineLogout,
  HiUser,
  HiChartBar,
  HiHome,
  HiFolder,
} from "react-icons/hi";

const Navigation = ({ isNavbarOpen, toggleNavbar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    navigate("/");
  };

  useEffect(() => {
    document.body.classList.toggle("body-pd", isNavbarOpen);
  }, [isNavbarOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-white shadow-md flex items-center justify-between px-4 h-12 z-50">
        <button className="text-xl text-indigo-600" onClick={toggleNavbar}>
          <FiMenu />
        </button>
        <div className="w-8 h-8 rounded-full overflow-hidden">
          <img
            src="https://i.imgur.com/hczKIze.jpg"
            alt="Profile"
            className="w-full h-full"
          />
        </div>
      </header>

      <div
        className={`fixed top-0 left-0 h-full bg-indigo-700 text-white transition-all ${
          isNavbarOpen ? "w-60" : "w-16"
        }`}
      >
        <nav className="flex flex-col justify-between h-full">
          <div>
            <Link
              to="#"
              className="flex items-center gap-3 p-3 hover:bg-indigo-600"
            >
              <HiHome className="text-xl" />
              {isNavbarOpen && (
                <span className="text-sm font-medium">Dashboard</span>
              )}
            </Link>
            {/* Add other links */}

            <Link
              to="#"
              className={`flex items-center gap-3 p-3 hover:bg-indigo-600 ${
                location.pathname === "/users" && "bg-indigo-600"
              }`}
            >
              <HiUser className="text-xl" />
              {isNavbarOpen && (
                <span className="text-sm font-medium">Users</span>
              )}
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 p-3 hover:bg-indigo-600"
            >
              <HiFolder className="text-xl" />
              {isNavbarOpen && (
                <span className="text-sm font-medium">Files</span>
              )}
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 p-3 hover:bg-indigo-600"
            >
              <HiChartBar className="text-xl" />
              {isNavbarOpen && (
                <span className="text-sm font-medium">Stats</span>
              )}
            </Link>
            <Link
              to="/jobslist"
              className="flex items-center gap-3 p-3 hover:bg-indigo-600"
            >
              <HiChartBar className="text-xl" />
              {isNavbarOpen && (
                <span className="text-sm font-medium">Add Jobs</span>
              )}
            </Link>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 p-3 hover:bg-indigo-600"
          >
            <HiOutlineLogout className="text-xl" />
            {isNavbarOpen && (
              <span className="text-sm font-medium">Sign Out</span>
            )}
          </button>
        </nav>
      </div>
    </>
  );
};
export default Navigation;
