import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authservices from "../Services/Authservices";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ---------- Email Registration ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = { name, email, password, phone };
      await Authservices.RegisterUser(userData);

      alert("OTP sent to your email!");
      navigate(`/verify-otp?email=${email}`);
    } catch (error) {
      alert(error.message);
      console.log("Register error:", error);
    }
    setLoading(false);
  };

  // ---------- Google Signup/Login ----------
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await axios.post("/api/v1/user/google-auth", {
        token: credentialResponse.credential,
      });

      localStorage.setItem("token", res.data.token);
      alert(`Welcome ${res.data.user.name}! Logged in with Google`);
      navigate("/dashboard");
    } catch (err) {
      console.error("Google login failed:", err);
      alert("Google login failed");
    }
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 px-4 py-12">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-3xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
          Create Account
        </h1>

        {/* ---------- Email Registration Form ---------- */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="email"
            placeholder="Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white rounded-xl font-semibold transition ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Sending OTP..." : "Register"}
          </button>
        </form>

        {/* ---------- OR Separator ---------- */}
        <div className="flex items-center my-4">
          <hr className="flex-1 border-gray-300" />
          <span className="px-2 text-gray-500">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* ---------- Google Login ---------- */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => alert("Google login failed")}
          />
        </div>

        <p className="text-center text-gray-700 mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            Login here
          </span>
        </p>
      </div>
    </section>
  );
}
