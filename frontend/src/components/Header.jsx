import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Header = () => {
  const navigate = useNavigate();

  const handleBookAppointment = () => {
    const token = localStorage.getItem("token"); // check if user logged in
    if (token) {
      navigate("/doctors"); // redirect to all doctors page
    } else {
      navigate("/login"); // redirect to login page
    }
  };

  return (
    <div className="pt-20 md:pt-24 flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:px-20 pb-8 md:pb-14 bg-gradient-to-br from-blue-50 via-blue-100 to-white overflow-hidden">

      {/* LEFT SIDE */}
      <div className="md:w-1/2 text-center md:text-left space-y-4 sm:space-y-5 md:space-y-7">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-gray-800 leading-snug sm:leading-tight md:leading-tight">
          Book Appointment <br />
          <span className="text-blue-600">With Trusted Doctors</span>
        </h1>

        <p className="text-gray-600 text-xs sm:text-sm md:text-lg max-w-full sm:max-w-sm md:max-w-md mx-auto md:mx-0">
          Your health, your time — find expert doctors and schedule instantly.
        </p>

        {/* USERS SECTION */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center gap-2 sm:gap-4 justify-center md:justify-start mt-3 sm:mt-4">
          <img
            src={assets.group_profiles}
            alt="Group Profiles"
            className="w-12 sm:w-14 md:w-20 rounded-full shadow-sm"
          />
          <p className="text-gray-600 text-xs sm:text-sm md:text-sm max-w-xs text-center sm:text-left">
            Over <span className="font-semibold text-blue-700">10,000+</span>{" "}
            patients trust our platform.
          </p>
        </div>

        {/* CTA BUTTON */}
        <button
          onClick={handleBookAppointment}
          className="mt-3 sm:mt-4 md:mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 sm:px-6 md:px-8 py-2 sm:py-3 md:py-3 rounded-full shadow-lg transition transform hover:scale-105"
        >
          Book Appointment
          <img src={assets.arrow_icon} alt="arrow" className="w-3 sm:w-4 md:w-5" />
        </button>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <div className="md:w-1/2 mt-6 md:mt-0 relative w-full max-w-xs sm:max-w-sm md:max-w-lg mx-auto">
        <div className="absolute inset-0 bg-blue-300 opacity-20 blur-3xl rounded-full"></div>

        <img
          src={assets.header_img}
          alt="Doctors"
          className="relative w-full drop-shadow-xl animate-fadeIn"
        />
      </div>
    </div>
  );
};

export default Header;
