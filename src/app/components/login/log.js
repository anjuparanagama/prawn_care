"use client";

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const [userID, setuserID] = useState("");
  const [password, setpassword] = useState("");
  const router = useRouter();

  function handleLogin(event) {
    event.preventDefault();
    console.log("UserID:", userID);
    console.log("Password:", password);
    axios.post('/api/login/login', {
      userid: userID,
      password: password
    })
    .then(response => {
      console.log("Login Success:", response.data);
      // Redirect to dashboard after successful login
      router.push('/Dashboard');
    })
    .catch(error => {
      console.log("Login Error:", error.response?.data);
      alert("Login Failed: " + (error.response?.data?.message || "Server Error"));
    });
  }

  return (
    <div className="flex w-full bg-white ">
      <div className="illustration-container min-h-screen w-1/2 flex items-center justify-center ">
        <img 
          src="/images/lg.jpeg" 
          alt="Abstract illustration of a person holding a key, standing in front of a door shaped like a shield, with a gradient purple and blue background" 
          className="w-full h-[100%] pl-14"
        />
      </div>
      <div className="form-container w-1/2 p-12 pl-36  flex flex-col justify-center ">
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Welcome Back</h1>
        <p className="text-gray-600 mb-8">Sign in to your account to continue</p>
        <form id="loginForm" className="space-y-6">
          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm mb-3 font-medium text-gray-700">User ID</label>
            <input 
              type="text" 
              id="text" 
              placeholder="PFXXXXX" 
              value={userID}
              onChange={(e) => setuserID(e.target.value)}
              className="input-field w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm mb-3 font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              className="input-field w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
              required
            />
          </div>
          <div className="flex items-center justify-between w-2/3">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="remember" 
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
          </div>
          <button 
            type="button" 
            onClick={handleLogin}
            className="w-2/3 bg-[#4C64FF] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Sign In
          </button>
          <div className="text-center text-sm text-gray-600 w-2/3">
            <p>Don't have an account? <a href="/Signup" className="text-indigo-600 hover:text-indigo-500">Sign up</a></p>
          </div>
        </form>
      </div>
    </div>
  );
}
