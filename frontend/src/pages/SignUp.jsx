import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [Value, setValues] = useState({
    username: "",
    email: "",
    password: "",
    address: "",
  });

  const navigate=useNavigate();

  const submit = async (e) => {

    e.preventDefault(); 

    try {
      if (
        Value.username === "" ||
        Value.email === "" ||
        Value.password === "" ||
        Value.address === ""
      ) {
        alert("All Fields are required");
      } else {
        const response=await axios.post("https://bookstore-5ik6.onrender.com/api/sign-up",Value);
        alert(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({
      ...prev, 
      [name]: value, 
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-100 to-white">
      <div className="bg-white text-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-200">
        <h2 className="text-3xl font-bold text-center mb-6">Create an Account</h2>

        <form className="space-y-5" onSubmit={submit}>
          <div>
            <label className="block text-gray-600 text-sm mb-2">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 border border-gray-300 text-gray-800 outline-none"
              required
              value={Value.username}
              onChange={change}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="xyz@example.com"
              className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 border border-gray-300 text-gray-800 outline-none"
              required
              value={Value.email}
              onChange={change}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 border border-gray-300 text-gray-800 outline-none"
              required
              value={Value.password}
              onChange={change}
            />
          </div>

          <div>
            <label className="block text-gray-600 text-sm mb-2">Address</label>
            <textarea
              name="address"
              placeholder="Enter your address"
              rows="3"
              className="w-full p-3 rounded-lg bg-gray-100 focus:ring-2 focus:ring-blue-500 border border-gray-300 text-gray-800 outline-none"
              required
              value={Value.address}
              onChange={change}
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition-all p-3 rounded-lg text-white font-semibold"
          >
            Sign Up
          </button>
        </form>

        <div className="text-center mt-6 text-gray-600">
          <p>
            Already have an account? &nbsp;
            <Link to="/login" className="text-blue-500 hover:underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
