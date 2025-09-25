"use client";

import React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
  const [userName, setuserName] = useState("");
  const [password, setpassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  function handleLogin(event) {
    event.preventDefault();
    console.log("UserName:", userName);
    console.log("Password:", password);
    axios.post('/api/login/login', {
      userName: userName,
      password: password,
      rememberMe: rememberMe
    })
    .then(response => {
      console.log("Login Success:", response.data);
      // Store token based on remember me
      if (rememberMe) {
        localStorage.setItem('token', response.data.token);
      } else {
        sessionStorage.setItem('token', response.data.token);
      }
      sessionStorage.setItem('user', JSON.stringify(response.data.user));
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
            <label htmlFor="email" className="block text-sm mb-3 font-medium text-gray-700">User Name</label>
            <input 
              type="text" 
              id="text" 
              placeholder="Enter User Name"
              value={userName}
              onChange={(e) => setuserName(e.target.value)}
              className="input-field w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
              required
            />
          </div>
          <div className="space-y-1">
            <label htmlFor="password" className="block text-sm mb-3 font-medium text-gray-700">Password</label>
            <div className="relative w-2/3">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                className="input-field w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12C23 12 19 20 12 20C5 20 1 12 1 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 2L22 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between w-2/3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Remember me</label>
            </div>
          </div>
          <button 
            type="button" 
            onClick={handleLogin}
            className="w-2/3 bg-[#4C64FF] text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
