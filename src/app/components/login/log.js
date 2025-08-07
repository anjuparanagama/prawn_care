import React from 'react'
import Image from 'next/image'

export default function Login() {
  return (
    <div class="flex w-full bg-white ">
    <div class="illustration-container min-h-screen w-1/2 flex items-center justify-center ">
        <img 
            src="/images/logg.png" 
            alt="Abstract illustration of a person holding a key, standing in front of a door shaped like a shield, with a gradient purple and blue background" 
            class="w-full h-[100%]"
        />
    </div>
    

    <div class="form-container w-1/2 p-12 pl-36  flex flex-col justify-center ">
        <h1 class="text-3xl font-bold text-gray-800 mb-3">Welcome Back</h1>
        <p class="text-gray-600 mb-8">Sign in to your account to continue</p>
        
        <form id="loginForm" class="space-y-6">
            <div class="space-y-1">
                <label for="email" class="block text-sm mb-3 font-medium text-gray-700">User ID</label>
                <input 
                    type="email" 
                    id="email" 
                    placeholder="PFXXXXX" 
                    class="input-field w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                    required
                />
            </div>
            
            <div class="space-y-1">
                <label for="password" class="block text-sm mb-3 font-medium text-gray-700">Password</label>
                <input 
                    type="password" 
                    id="password" 
                    placeholder="••••••••" 
                    class="input-field w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                    required
                />
            </div>
            
            <div class="flex items-center justify-between w-2/3">
                <div class="flex items-center">
                    <input 
                        type="checkbox" 
                        id="remember" 
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label for="remember" class="ml-2 block text-sm text-gray-700">Remember me</label>
                </div>
                <a href="#" class="text-sm text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
            
            <button 
                type="submit" 
                class="w-2/3 bg-[#4C64FF] text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
                Sign In
            </button>
            
            <div class="text-center text-sm text-gray-600 w-2/3">
                <p>Don't have an account? <a href="/Signup" class="text-indigo-600 hover:text-indigo-500">Sign up</a></p>
            </div>
        </form>
    </div>
</div>
);
}