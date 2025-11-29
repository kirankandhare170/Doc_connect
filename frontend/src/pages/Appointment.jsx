import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { doctors } from "../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";
import emailjs from "emailjs-com";

const Appointment = () => {
  const { docId } = useParams();
  const doctor = doctors.find((doc) => doc._id === docId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);

  if (!doctor) {
    return <p className="text-center py-10 text-red-500 font-semibold">Doctor not found</p>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loggedInEmail = localStorage.getItem("userEmail");
    if (formData.email !== loggedInEmail) {
      toast.error("Use the email of your logged-in account!");
      return;
    }

    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Send appointment data to backend
      await axios.post("http://localhost:3000/api/appointments", {
        doctorId: doctor._id,
        doctorName: doctor.name,
        speciality: doctor.speciality,
        ...formData,
      });

      // Send Email notification using EmailJS
      await emailjs.send(
        "service_88lqnls",
        "template_wlmsvgh",
        {
          name: formData.name,
          email: formData.email,
          date: formData.date,
          time: formData.time,
          doctorName: doctor.name,
          speciality: doctor.speciality,
          message: "New appointment booked",
        },
        "n3JD2HNk5x_NNp7M-"
      );

      toast.success("Appointment booked & email sent!");
      setFormData({ name: "", email: "", date: "", time: "" });
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment or send email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-6 md:px-20 py-12">
      
      {/* Doctor Details */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 bg-white p-6 rounded-2xl shadow-md">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="w-40 h-40 object-cover rounded-full shadow-lg"
        />
        <div className="flex-1 space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{doctor.name}</h1>
          <p className="text-blue-600 font-medium">{doctor.speciality}</p>
          <p className="text-gray-600">{doctor.about}</p>
          <p className="text-gray-700">Degree: {doctor.degree}</p>
          <p className="text-gray-700">Experience: {doctor.experience}</p>
          <p className="text-gray-700">Consultation Fee: ${doctor.fees}</p>
        </div>
      </div>

      {/* Appointment Form */}
      <div className="mt-10 bg-white p-6 md:p-8 rounded-2xl shadow-md max-w-lg mx-auto">
        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-800 text-center">
          Book an Appointment
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select Time Slot --</option>
            {["09:00 AM", "10:00 AM", "11:00 AM", "02:00 PM", "03:00 PM", "04:00 PM"].map(
              (slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              )
            )}
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition disabled:opacity-50"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Appointment;
