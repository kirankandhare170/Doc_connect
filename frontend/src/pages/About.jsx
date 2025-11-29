import React from "react";

export default function About() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 px-6 py-12">
      <div className="max-w-3xl bg-white rounded-3xl shadow-2xl p-10 md:p-16">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6 text-center md:text-left">
          About Us
        </h1>

        <p className="text-gray-700 leading-relaxed mb-4 text-justify">
          Welcome to <span className="font-semibold text-indigo-600">Our Project</span>!  
          We are dedicated to building a platform that makes it easier for users 
          to connect, book appointments, and manage services with ease.
        </p>

        <p className="text-gray-700 leading-relaxed mb-4 text-justify">
          Our mission is to provide a seamless experience with modern design and 
          powerful backend support. We believe in making technology accessible, 
          efficient, and user-friendly for everyone.
        </p>

        <p className="text-gray-700 leading-relaxed text-justify">
          Thank you for being a part of our journey 🚀. Together, we can achieve 
          great things!
        </p>
      </div>
    </section>
  );
}
