import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "./../assets/assets";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", icon: assets.home_icon, label: "Dashboard" },
    { to: "Allappointments", icon: assets.appointment_icon, label: "All Appointments" },
    { to: "/add-doctor", icon: assets.add_icon, label: "Add Doctors" },
    { to: "/doctors", icon: assets.people_icon, label: "Doctor List" },
  ];

  return (
    <>
      {/* MOBILE TOGGLE BUTTON */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white px-3 py-2 rounded-lg shadow-md"
        onClick={() => setOpen(!open)}
      >
        {open ? "✖ Close" : "☰ Menu"}
      </button>

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 
        shadow-lg md:shadow-none flex flex-col transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="px-6 py-5 text-2xl font-bold text-gray-800 border-b">
          Admin Panel
        </div>

        {/* Links */}
        <ul className="flex-1 px-3 py-4 space-y-2 overflow-y-auto">
          {links.map((link, index) => (
            <li key={index}>
              <NavLink
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                   ${
                     isActive
                       ? "bg-indigo-600 text-white shadow-md"
                       : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                   }`
                }
              >
                <img src={link.icon} alt="" className="w-5 h-5 opacity-80" />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
