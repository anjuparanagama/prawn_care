"use client";

import { useState } from "react";
import axios from "axios";


export default function Sign() {
    const [formData, setFormData] = useState({
        serviceId: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate password match
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:3000/api/register', {
                serviceId: formData.serviceId,
                email: formData.email,
                password: formData.password,
                phone: formData.phone
            });
            
            if (response.data.success) {
                alert('Registration successful!');
                window.location.href = '/Login';
            }
        } catch (error) {
            console.error('Registration error:', error);
            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert('Registration failed. Please try again.');
            }
        }
    }

    return (
        <div className="h-screen flex items-center justify-center p-4">
            <div className="flex w-full max-w-6xl bg-white">
                <div className="form-container w-1/2 p-12 pt-16 flex flex-col justify-center">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">Create an Account</h1>
                    
                    <form id="registrationForm" className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-1">
                            <label htmlFor="serviceId" className="block text-sm pb-2 font-medium text-gray-700">Service ID</label>
                            <input 
                                type="text" 
                                id="serviceId" 
                                value={formData.serviceId}
                                onChange={handleChange}
                                placeholder="Enter your service ID" 
                                className="input-field w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        
                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm pb-2 font-medium text-gray-700">Email Address</label>
                            <input 
                                type="email" 
                                id="email" 
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="your@email.com" 
                                className="input-field w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        
                        <div className="space-y-1">
                            <label htmlFor="password" className="block text-sm pb-2 font-medium text-gray-700">Password</label>
                            <input 
                                type="password" 
                                id="password" 
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••" 
                                className="input-field w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        
                        <div className="space-y-1">
                            <label htmlFor="confirmPassword" className="block text-sm pb-2 font-medium text-gray-700">Confirm Password</label>
                            <input 
                                type="password" 
                                id="confirmPassword" 
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••" 
                                className="input-field w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        
                        <div className="space-y-1">
                            <label htmlFor="phone" className="block text-sm font-medium pb-2 text-gray-700">Phone Number</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+94 7X XXX XXXX" 
                                className="input-field w-3/4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 transition"
                                required
                            />
                        </div>
                        
                        <button 
                            type="submit" 
                            className="w-3/4 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Register
                        </button>
                        
                        <div className="text-left text-sm text-gray-600">
                            <p>Already have an account? <a href="/Login" className="text-indigo-600 hover:text-indigo-500">Sign in</a></p>
                        </div>
                    </form>
                </div>
                
                <div className="illustration-container w-2/3 flex items-center justify-center">
                    <img 
                        src="/images/lg.jpeg" 
                        alt="Signup illustration" 
                        className="w-full h-auto object-contain rounded-lg"
                    />
                </div>
            </div>
        </div>      
    );
}
