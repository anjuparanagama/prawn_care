"use client";

import React, { useState } from 'react';
import { Check, X } from 'lucide-react';

export default function User() {
  const [users, setUsers] = useState([
    {
      userId: '01',
      serviceId: '01',
      userName: 'John',
      email: 'John@gmail.com',
      mobileNo: '0771457893',
      approved: null // null = pending, true = approved, false = rejected
    }
  ]);

  // Status history for the third table
  const [statusHistory, setStatusHistory] = useState([
    {
      userId: '01',
      serviceId: '01',
      userName: 'John',
      email: 'John@gmail.com',
      mobileNo: '0771457893',
      status: 'Approved'
    },
    {
      userId: '01',
      serviceId: '01',
      userName: 'John',
      email: 'John@gmail.com',
      mobileNo: '0771457893',
      status: 'Rejected'
    },
    {
      userId: '01',
      serviceId: '01',
      userName: 'John',
      email: 'John@gmail.com',
      mobileNo: '0771457893',
      status: 'Approved'
    }
  ]);

  const [formData, setFormData] = useState({
    serviceId: '',
    userName: '',
    email: '',
    mobileNo: '',
    password: ''
  });

  const handleApproval = (userId, status) => {
    setUsers(users.map(user => 
      user.userId === userId 
        ? { ...user, approved: status }
        : user
    ));

    // Add to status history when approval changes
    const user = users.find(u => u.userId === userId);
    if (user) {
      const newStatusEntry = {
        userId: user.userId,
        serviceId: user.serviceId,
        userName: user.userName,
        email: user.email,
        mobileNo: user.mobileNo,
        status: status ? 'Approved' : 'Rejected'
      };
      setStatusHistory([...statusHistory, newStatusEntry]);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddUser = () => {
    if (formData.serviceId && formData.userName && formData.email && formData.mobileNo && formData.password) {
      const newUser = {
        userId: String(users.length + 1).padStart(2, '0'),
        serviceId: formData.serviceId,
        userName: formData.userName,
        email: formData.email,
        mobileNo: formData.mobileNo,
        approved: null
      };
      setUsers([...users, newUser]);
      setFormData({
        serviceId: '',
        userName: '',
        email: '',
        mobileNo: '',
        password: ''
      });
    }
  };

  return (
    <div className='bg-white h-screen flex flex-row text-blue-700 overflow-hidden'>
      {/* Left Space */}
      <div className="w-1/6 h-full bg-cyan-50"></div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-7 px-8 pb-4 min-h-0">
        <div className="text-2xl font-bold mb-4 py-0 text-[#1C00B8]">User Management</div>        
        <div className="flex-1 flex flex-col space-y-6 min-h-0">
        {/* Second Table - Add User Form */}
        <div className="flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-blue-100 px-6 py-2 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-blue-900 text-center">Add User</h2>
            </div>
            <div className="p-6 mt-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-24">Service ID</label>
                    <input
                      type="text"
                      name="serviceId"
                      value={formData.serviceId}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-24">E-Mail</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-24">Password</label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-24">User Name</label>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="text-sm font-medium text-gray-700 w-24">Mobile No</label>
                    <input
                      type="tel"
                      name="mobileNo"
                      value={formData.mobileNo}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleAddUser}
                      className="px-8 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      ADD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Third Table - User Status History */}
        <div className="flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-blue-100 border-b border-gray-200">
              <div className="grid grid-cols-6 gap-4 px-6 py-3 text-sm font-medium text-gray-700">
                <div>User ID</div>
                <div>Service ID</div>
                <div>User Name</div>
                <div>E-Mail</div>
                <div>Mobile No</div>
                <div>Status</div>
              </div>
            </div>

            {/* Table Body - Only first entry */}
            <div className="divide-y divide-gray-200">
              <div className="grid grid-cols-6 gap-4 px-6 py-3 text-sm text-gray-900 hover:bg-gray-50 transition-colors">
                <div className="font-medium">{statusHistory[0]?.userId}</div>
                <div>{statusHistory[0]?.serviceId}</div>
                <div>{statusHistory[0]?.userName}</div>
                <div className="text-blue-600">{statusHistory[0]?.email}</div>
                <div>{statusHistory[0]?.mobileNo}</div>
                <div>
                  <span className={`font-medium ${
                    statusHistory[0]?.status === 'Approved' 
                      ? 'text-green-600' 
                      : 'text-red-500'
                  }`}>
                    {statusHistory[0]?.status}
                  </span>
                </div>
              </div>
            </div>
            
            {/* See All Button */}
            <div className="border-t border-gray-200 px-6 py-3 text-center">
              <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors">
                See All
              </button>
            </div>
          </div>
        </div>
              </div>
      </div>
    </div>
  );
}