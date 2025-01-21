
import { useState, useEffect, useContext, useMemo } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  BellIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  CreditCardIcon,
  DocumentMagnifyingGlassIcon,
  ChatBubbleLeftEllipsisIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  CogIcon,
  Cog6ToothIcon,
  CalendarIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

import {
  HomeIcon as HomeIconSolid,
  ClipboardDocumentListIcon as ClipboardDocumentListIconSolid,
  CreditCardIcon as CreditCardIconSolid,
  DocumentMagnifyingGlassIcon as DocumentMagnifyingGlassIconSolid,
  UsersIcon as UsersIconSolid,
  FolderIcon as FolderIconSolid,
  CogIcon as CogIconSolid,
  ClipboardDocumentCheckIcon as ClipboardDocumentCheckIconSolid,
  ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  DocumentTextIcon as DocumentTextIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  CalendarIcon as CalendarIconSolid,
  UserPlusIcon as UserPlusIconSolid,
} from "@heroicons/react/24/solid";

import { BsCalendar } from "react-icons/bs";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import { BsPersonAdd } from "react-icons/bs";

import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/20/solid";
import { Link, useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation

import { SiOpenai } from "react-icons/si";
import { AiOutlineCaretDown } from "react-icons/ai";
import { FaCogs } from "react-icons/fa";
import { FaIndustry } from "react-icons/fa";
import { BiSolidBusiness } from "react-icons/bi";
import { FaChevronDown } from "react-icons/fa";
import { BsDatabaseAdd } from "react-icons/bs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { Disclosure } from "@headlessui/react";
import { FiMenu } from "react-icons/fi";
import './navbar.css';

const allNavigation = {
  items: [
        {
          name: "Calender",
          href: "/Calender",
          icon: CalendarIcon,
          iconFilled: CalendarIconSolid,
          // permission: PERMISSIONS.ACCESS_CALENDAR,
        },
        {
          name: "Job Portal",
          href: "/jobportal",
          icon: SiOpenai,
          iconFilled: SiOpenai, // Use same icon as filled version or replace with custom
         
        },
        {
          name: "Jobs",
          href: "/jobs",
          icon: SiOpenai,
          iconFilled: SiOpenai, // Use same icon as filled version or replace with custom
          
        },
  ],
};

const userNavigation = [
  { name: "Your profile", href: "/Profile" },
  { name: "Sign out", href: "/" }, // Redirect to login page
];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

export default function Navigation() {
 
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation(); // Initialize useLocation
  const [logindata, setLogindata] = useState(null);
  const [isMasterDataExpanded, setIsMasterDataExpanded] = useState(false);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleSignOut = () => {
  
    navigate("/");
  };

  const handleSettingsClick = (event) => {
    event.preventDefault();
    navigate("/Settings");
    // Handle settings logic here, such as opening a settings modal
  };


  useEffect(() => {
    // Retrieve tenant settings from localStorage
    const tenantSettings = JSON.parse(localStorage.getItem("tenantSettings"));

    // If tenant settings exist and contain a CompanyLogo, set it
    if (tenantSettings) {
      setCompanyLogo(tenantSettings.tenantSettings?.CompanyLogo);
    }
  }, []);

  console.log("CompanyLogo", companyLogo);

  // Notify main-container when state changes
  useEffect(() => {
    const mainContainer = document.querySelector(".main-container");

    if (mainContainer) {
      if (isCollapsed) {
        mainContainer.classList.add("collapsed");
        mainContainer.classList.remove("expanded");
      } else {
        mainContainer.classList.add("expanded");
        mainContainer.classList.remove("collapsed");
      }
    }
  }, [isCollapsed]);
  // Load the initial state from localStorage
  useEffect(() => {
    const storedState = localStorage.getItem("navbar-collapsed");
    if (storedState) {
      setIsCollapsed(JSON.parse(storedState));
    }
  }, []);

  // Save the state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("navbar-collapsed", JSON.stringify(isCollapsed));
  }, [isCollapsed]);
  const [isMinimized, setIsMinimized] = useState(false);

  // const toggleNavbar = () => setIsMinimized((prev) => !prev);
  // const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      <div>
      <div
  className={`fixed inset-y-0 z-50 shadow-lg transition-all duration-300 nav-bg-color h-screen flex flex-col ${isCollapsed ? "lg:w-20 md:w-20 sm:w-20 w-20" : "lg:w-60 w-64"}`}
>
  <div className="flex flex-col grow px-4 pb-4 overflow-x-hidden overflow-y-auto" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
    <div className="fixed top-4 left-0 right-0 flex items-center justify-between px-4 z-50">
      {!isCollapsed ? (
        <button
          className="flex items-center justify-center w-8 h-8 nav-bg-color-buttons rounded-full ml-40"
          onClick={() => setIsCollapsed(true)}
        >
          <FaTimes className="text-white text-sm" />
        </button>
      ) : (
        <button
          className="flex items-center justify-center w-8 h-8 rounded-full nav-bg-color-buttons"
          onClick={() => setIsCollapsed(false)}
        >
          <div className="flex flex-col items-center justify-center space-y-1">
            <span className="block w-4 h-[2px] bg-white"></span>
            <span className="block w-4 h-[2px] bg-white"></span>
            <span className="block w-4 h-[2px] bg-white"></span>
          </div>
        </button>
      )}
    </div>

<nav className="mt-16">
  <ul role="list" className="space-y-1">
    {Object.keys(allNavigation).map((key) => (
      <li key={key}>
        {key === "MasterData" ? (
          // Handle Master Data (with dropdown)
          <Disclosure defaultOpen={allNavigation[key].some((subItem) =>
            window.location.pathname.startsWith(subItem.href)
          )}>
            {({ open }) => (
              <>
                <Disclosure.Button className="flex items-center justify-between p-2 w-full cursor-pointer group">
                  <div className="flex items-center space-x-2">
                    <BsDatabaseAdd className="h-6 w-6" />
                    {!isCollapsed && <span className="text-sm font-bold text-gray-700">Master Data</span>}
                  </div>
                  {/* <FaChevronDown
                    className={`h-4 w-4 text-gray-700 transition-transform ${open ? "rotate-180" : "rotate-0"}`}
                  /> */}
                </Disclosure.Button>
                <Disclosure.Panel>
                  <ul className={`space-y-1 ${!isCollapsed ? "pl-6" : ""}`}>
                    {allNavigation[key].map((subItem) => (
                      <li key={subItem.name}>
                        <a
                          href={subItem.href}
                          className={`flex items-center p-2 text-xs font-medium rounded-md ${
                            window.location.pathname.startsWith(subItem.href)
                              ? "nav-bg-color-buttons"
                              : "nav-bg-hover-color-buttons"
                          }`}
                        >
                          <subItem.icon
                            className={`h-5 w-5 mr-2 ${
                              window.location.pathname.startsWith(subItem.href)
                                ? "text-white"
                                : "text-gray-700"
                            }`}
                          />
                          {!isCollapsed && subItem.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        ) : (
          // Render other top-level items
          allNavigation[key].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`flex items-center p-2 text-sm font-medium rounded-md ${
                window.location.pathname.startsWith(item.href)
                  ? "nav-bg-color-buttons"
                  : "nav-bg-hover-color-buttons"
              }`}
            >
              <item.icon
                className={`mr-2 ${
                  window.location.pathname.startsWith(item.href) ? "text-white" : "text-gray-700"
                }`}
                style={{ height: "20px", width: "20px" }}
              />
              {!isCollapsed && item.name}
            </a>
          ))
        )}
      </li>
    ))}
  </ul>
</nav>


    <div className="mt-auto w-full">
      <button
        onClick={handleSettingsClick}
        className={`group flex items-center p-2 text-xs font-medium w-full pl-0 rounded-md ${
          window.location.pathname.startsWith("/Settings") ? "nav-bg-color-buttons" : "nav-bg-hover-color-buttons"
        }`}
      >
        <Cog6ToothIcon
          aria-hidden="true"
          className={`h-6 w-6 shrink-0 ml-2 mr-2 ${window.location.pathname.startsWith("/Settings") ? "text-white" : "text-gray-700 group-hover:text-gray-700"}`}
        />
        {!isCollapsed && <span>Settings</span>}
      </button>
    </div>
  </div>
</div>

      </div>

      <div className="lg:pl-100">
        <div
          className="fixed top-0 left-0 right-0 z-40 flex  nav-bg-color h-20 w-full items-center gap-x-4 border-b border-gray-200 px-2 shadow-sm sm:gap-x-4 sm:px-4 lg:px-6"
          // style={{ backgroundColor: "#C0C0C0" }}
        >
          <div className="flex flex-1 justify-between items-center gap-x-3 lg:gap-x-4 ml-2 sm:ml-0">
            <div className="relative sm:w-1/4 flex items-center justify-center mx-auto">
              <div className="block lg:translate-x-32">
                {/* {companyLogo && (
                  <img
                    alt="Your Company"
                    src={companyLogo}
                    className="h-10 w-auto sm:h-14 md:h-18 lg:h-14 mx-auto"
                  />
                )} */}
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-3 lg:gap-x-4">
              {/* Notification Button */}
              <button
                type="button"
                // className="-m-1.5 p-1.5 text-white hover:text-gray-500"
                className="-m-1.5 p-1.5 text-black hover:text-gray-500 hover:motion-preset-shake  "
              >
                <span className="sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="h-7 w-7" />
              </button>

              <div
                aria-hidden="true"
                // className="hidden lg:block lg:h-5 lg:w-px lg:bg-white"
                className="hidden lg:block lg:h-5 lg:w-px lg:bg-black"
              />

              {/* User Menu */}
              <Menu as="div" className="relative">
                <MenuButton className="-m-1 flex items-center p-1">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt="Profile"
                    src={
                      logindata?.ProfileImage
                        ? logindata.ProfileImage
                        : "https://via.placeholder.com/150/000000/FFFFFF/?text=Unknown+User"
                    }
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <span className="hidden lg:flex lg:items-center ml-2">
                    <span
                      aria-hidden="true"
                      // className="text-sm font-semibold leading-6 text-white"
                      className="text-lg font-semibold leading-6 text-black"
                    >
                      {logindata && logindata.FirstName && logindata.LastName
                        ? `${logindata.FirstName} ${logindata.LastName}`
                        : "Loading..."}
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-2 h-6 w-6 text-black"
                    />
                  </span>
                </MenuButton>

                <MenuItems className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 motion-duration-300 motion-preset-expand">
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                        onClick={
                          item.name === "Sign out" ? handleSignOut : undefined
                        }
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>

        <main className="py-0">
          <div className="px-2 sm:px-4 lg:px-6"></div>
        </main>
      </div>
    </>

  );
}
