import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Authservices from "../Services/Authservices";

export default function VerifyOtp() {
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Get email from query param
  const email = new URLSearchParams(location.search).get("email");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      alert("Enter a valid 4-digit OTP!");
      return;
    }

    setLoading(true);
    try {
      await Authservices.VerifyOtp(email, otp);
      alert("Email Verified Successfully!");
      navigate("/login");
    } catch (error) {
      alert(error.message || "Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    try {
      await Authservices.ResendOtp(email);
      alert("New OTP sent to your email!");
    } catch (error) {
      alert(error.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-500 to-emerald-600 px-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Verify OTP
        </h1>

        <p className="text-center mb-4 text-gray-600">
          OTP sent to <span className="font-semibold">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-green-500 text-center text-xl tracking-widest placeholder-gray-400"
            maxLength={6}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-xl font-semibold transition ${
              loading ? "bg-green-300 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>

        <p className="text-center mt-4 text-gray-700 text-sm">
          Didn’t receive OTP?{" "}
          <span
            className={`cursor-pointer font-medium ${
              loading ? "text-gray-400 pointer-events-none" : "text-green-600 hover:underline"
            }`}
            onClick={handleResend}
          >
            Resend OTP
          </span>
        </p>
      </div>
    </section>
  );
}
