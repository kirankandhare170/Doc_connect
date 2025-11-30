import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorList = () => {
  const { baseUrl } = useContext(AdminContext);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDoctors = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/v1/admin/getdoctors`);
      setDoctors(data.doctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      toast.error("❌ Failed to load doctors");
    } finally {
      setLoading(false);
    }
  };

  const toggleAvailability = async (doctorId, currentStatus) => {
    try {
      // Optimistic UI update
      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === doctorId ? { ...doc, available: !currentStatus } : doc
        )
      );

      await axios.patch(`${baseUrl}/api/v1/admin/change`, { userId: doctorId });
      toast.success("Doctor availability updated");
    } catch (error) {
      console.error(error);
      // Revert availability change if the API call fails
      setDoctors((prev) =>
        prev.map((doc) =>
          doc._id === doctorId ? { ...doc, available: currentStatus } : doc
        )
      );
      toast.error("❌ Failed to update availability");
    }
  };

  const deleteDoctor = async (doctorId) => {
    try {
      await axios.delete(`${baseUrl}/api/v1/admin/delete-doctor/${doctorId}`);
      setDoctors((prev) => prev.filter((d) => d._id !== doctorId));
      toast.success("Doctor deleted successfully");
    } catch (error) {
      console.error("Failed to delete doctor:", error);
      toast.error("❌ Failed to delete doctor");
    }
  };

  useEffect(() => {
    getDoctors();
  }, [baseUrl]);

  if (loading) {
    return <p className="text-center py-10 text-gray-500 animate-pulse">Loading doctors...</p>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Doctor List</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white p-4 rounded-2xl shadow-md flex flex-col items-center hover:shadow-xl transition"
          >
            <img
              src={doc.image}
              alt={doc.name}
              className="w-28 h-28 rounded-full object-cover mb-4 border-2 border-gray-200"
            />
            <div className="text-center">
              <p className="text-lg font-semibold text-gray-900">{doc.name}</p>
              <p className="text-sm text-gray-500">{doc.speciality}</p>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={doc.available}
                onChange={() => toggleAvailability(doc._id, doc.available)}
                className="w-5 h-5 text-green-500 focus:ring-green-400 rounded"
                aria-label="Toggle availability"
              />
              <p className="text-sm text-gray-700">Available</p>
            </div>
            {/* Delete Button */}
            <button
              onClick={() => deleteDoctor(doc._id)}
              className="mt-3 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorList;
