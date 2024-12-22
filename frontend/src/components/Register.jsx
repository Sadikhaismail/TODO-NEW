import React, { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reuse the same CSS as Login

function Register() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return setError("Please fill in all fields.");
    }

    try {
      await registerUser(formData);
      alert("Registered successfully, proceed to login.");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="background-container">
      <div className="login-box">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 uppercase tracking-widest">
          Register
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 text-lg border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button
            type="submit"
            className="w-full py-3 text-lg text-white rounded-md bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-800 hover:to-gray-600 transform hover:scale-105 transition-transform"
          >
            Register
          </button>
        </form>

        <div className="login-link mt-4 text-sm text-gray-900 text-center">
          <p>
            Already Registered?{" "}
            <a
              href="/login"
              className="font-semibold text-gray-500 hover:text-gray-900 hover:underline"
            >
              Login Here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
