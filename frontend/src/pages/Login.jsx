import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {authActions} from "../store/auth"
import {useDispatch} from "react-redux"

const Login = () => {

   const [Value, setValues] = useState({
      username: "",
      password: "",
    });
  
    const navigate=useNavigate();
    const dispatch = useDispatch();
  
    const submit = async (e) => {
  
      e.preventDefault(); 
  
      try {
        if (
          Value.username === "" ||
          Value.password === "" 
        ) {
          alert("All Fields are required");
        } else {
          const response=await axios.post("https://bookstore-5ik6.onrender.com/api/sign-in",Value);

          dispatch(authActions.login())
          dispatch(authActions.changeRole(response.data.role))
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("role", response.data.role);
          navigate("/profile");

          
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-white">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Login</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-600">Username</label>
            <input
              type="text"
              name="username"  // Added name attribute
              placeholder="Enter your username"
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              value={Value.username}
              onChange={change}
            />
          </div>
          <div>
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"  // Added name attribute
              placeholder="Enter your password"
              className="w-full px-4 py-2 mt-1 text-gray-800 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={Value.password}
              onChange={change}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white transition duration-300 bg-blue-500 rounded-md hover:bg-blue-600"
            onClick={submit}
          >
            Login
          </button>
        </form>
        <p className="text-center text-gray-600">
          Don't have an account? <Link to="/SignUp" className="text-blue-500 hover:underline">Sign Up</Link>

        </p>
      </div>
    </div>
  );
};

export default Login;
