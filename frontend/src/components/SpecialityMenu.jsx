import React from "react";
import { specialityData } from "../assets/assets";
import { Link } from "react-router-dom";

const SpecialityMenu = () => {
  return (
    <section className="px-6 md:px-20 py-16 bg-gradient-to-b from-blue-50 to-white">
      
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Find by <span className="text-blue-600">Speciality</span>
        </h1>
        <p className="text-gray-600 mt-3 text-sm md:text-base">
          Browse through our trusted doctors by speciality and book instantly.
        </p>
      </div>

      {/* Grid of Specialities */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {specialityData.map((item, index) => (
          <Link
            key={index}
            to={`/doctors/${item.speciality}`}
            className="flex flex-col items-center p-5 bg-white rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <div className="w-20 h-20 mb-3 flex items-center justify-center bg-blue-50 rounded-full">
              <img
                src={item.image}
                alt={item.speciality}
                className="w-12 h-12 object-contain"
              />
            </div>
            <p className="font-medium text-gray-700 text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SpecialityMenu;
