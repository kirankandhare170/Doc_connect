import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-[#0a0f1f] text-gray-300 px-6 md:px-20 py-14 mt-16">
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

        {/* Logo & About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <img src={assets.logo} alt="logo" className="h-12 w-12" />
            <h1 className="text-xl font-semibold text-white">Doc Connect</h1>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Your trusted platform to book appointments with verified doctors.  
            Get expert medical care from the comfort of your home.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h2 className="text-white font-semibold mb-4 text-lg">
            Quick Links
          </h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-blue-400 transition">Home</Link></li>
            <li><Link to="/doctors" className="hover:text-blue-400 transition">Doctors</Link></li>
            <li><Link to="/about" className="hover:text-blue-400 transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
          </ul>
        </div>

        {/* Specialities */}
        <div>
          <h2 className="text-white font-semibold mb-4 text-lg">
            Specialities
          </h2>
          <ul className="space-y-2 text-sm">
            <li><Link to="/doctors/Cardiologist" className="hover:text-blue-400 transition">Cardiology</Link></li>
            <li><Link to="/doctors/Dentist" className="hover:text-blue-400 transition">Dentistry</Link></li>
            <li><Link to="/doctors/Dermatologist" className="hover:text-blue-400 transition">Dermatology</Link></li>
            <li><Link to="/doctors/Orthopedic" className="hover:text-blue-400 transition">Orthopedics</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-white font-semibold mb-4 text-lg">Contact</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>Email: support@doctorapp.com</li>
            <li>Phone: +91 98765 43210</li>
            <li>Pune, Maharashtra</li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} <span className="text-gray-300 font-medium">Doc Connect</span>.  
        All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
