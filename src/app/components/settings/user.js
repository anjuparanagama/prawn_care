"use client";

import React, { useState, useEffect } from 'react';
import { Check, X, Edit, Trash2 } from 'lucide-react';

const API_BASE_URL = '/api/settings/registered-workers';

export default function User() {
  const [users, setUsers] = useState([]);

  // Status history for the third table
  const [statusHistory, setStatusHistory] = useState([]);

  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    mobileNo: '',
    password: ''
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [tableLoading, setTableLoading] = useState(true);
  const [tableError, setTableError] = useState('');

  const [editingUserId, setEditingUserId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    userName: '',
    email: '',
    mobileNo: ''
  });

  // Fetch registered workers on component mount
  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        setTableLoading(true);
        setTableError('');
        const response = await fetch(API_BASE_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch workers');
        }
        const data = await response.json();
        // Transform data to match the expected format
        const transformedData = data.map((worker, index) => ({
          userId: String(worker.id).padStart(2, '0'),
          userName: worker.name,
          email: worker.email,
          mobileNo: worker.workerDetails || worker.mobile_no
        }));
        setStatusHistory(transformedData);
      } catch (err) {
        setTableError('Failed to load user data');
        console.error('Error fetching workers:', err);
      } finally {
        setTableLoading(false);
      }
    };

    fetchWorkers();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(prev => !prev);
  };

  const handleAddUser = async () => {
    if (!formData.userName || !formData.email || !formData.mobileNo || !formData.password) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await fetch(`/api/signup/register-worker`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.userName,
          email: formData.email,
          password: formData.password,
          mobile_no: formData.mobileNo,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Worker registered successfully!');
        // Add to statusHistory for immediate UI update
        const newUser = {
          userId: String(statusHistory.length + 1).padStart(2, '0'),
          userName: formData.userName,
          email: formData.email,
          mobileNo: formData.mobileNo,
        };
        setStatusHistory([...statusHistory, newUser]);
        setFormData({
          userName: '',
          email: '',
          mobileNo: '',
          password: ''
        });
        setPasswordVisible(false);
      } else {
        setError(data.message || 'Failed to register worker');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (user) => {
    setEditingUserId(user.userId);
    setEditFormData({
      userName: user.userName,
      email: user.email,
      mobileNo: user.mobileNo
    });
  };

  const handleSave = async () => {
    if (!editFormData.userName || !editFormData.email || !editFormData.mobileNo) {
      alert('All fields are required');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/${editingUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editFormData.userName,
          email: editFormData.email,
          mobile_no: editFormData.mobileNo,
        }),
      });

      if (response.ok) {
        // Update the local state
        setStatusHistory(prev => prev.map(user =>
          user.userId === editingUserId
            ? { ...user, userName: editFormData.userName, email: editFormData.email, mobileNo: editFormData.mobileNo }
            : user
        ));
        setEditingUserId(null);
        setEditFormData({ userName: '', email: '', mobileNo: '' });
      } else {
        alert('Failed to update user');
      }
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setEditFormData({ userName: '', email: '', mobileNo: '' });
  };

  const handleDelete = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Remove from local state
        setStatusHistory(prev => prev.filter(user => user.userId !== userId));
      } else {
        alert('Failed to delete user');
      }
    } catch (err) {
      alert('Network error. Please try again.');
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
                    <label className="text-sm font-medium text-gray-700 w-24">User Name</label>
                    <input
                      type="text"
                      name="userName"
                      value={formData.userName}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center gap-4 relative">
                    <label className="text-sm font-medium text-gray-700 w-24">Password</label>
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      aria-label={passwordVisible ? "Hide password" : "Show password"}
                    >
                      {passwordVisible ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.96 9.96 0 012.175-6.125M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3l18 18" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {error && <p className="text-red-500 text-center text-sm mt-2 pt-3">{error}</p>}
                  {success && <p className="text-green-500 text-center text-sm mt-2 pt-3">{success}</p>}
                </div>
                <div className="space-y-4">
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
                      disabled={loading}
                      className="px-8 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Registering...' : 'ADD'}
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
              <div className="grid grid-cols-5 gap-4 px-6 py-3 text-sm font-medium text-gray-700">
                <div>User ID</div>
                <div>User Name</div>
                <div>E-Mail</div>
                <div>Mobile No</div>
                <div>Actions</div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200">
              {tableLoading ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  Loading users...
                </div>
              ) : tableError ? (
                <div className="px-6 py-8 text-center text-red-500">
                  {tableError}
                </div>
              ) : statusHistory.length === 0 ? (
                <div className="px-6 py-8 text-center text-gray-500">
                  No users found
                </div>
              ) : (
                statusHistory.map((user, index) => (
                  <div key={user.userId || index} className="grid grid-cols-5 gap-4 px-6 py-3 text-sm text-gray-900 hover:bg-gray-50 transition-colors">
                    <div className="font-medium">{user.userId}</div>
                    <div>
                      {editingUserId === user.userId ? (
                        <input
                          type="text"
                          name="userName"
                          value={editFormData.userName}
                          onChange={handleEditInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                      ) : (
                        user.userName
                      )}
                    </div>
                    <div>
                      {editingUserId === user.userId ? (
                        <input
                          type="email"
                          name="email"
                          value={editFormData.email}
                          onChange={handleEditInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                      ) : (
                        <span className="text-blue-600">{user.email}</span>
                      )}
                    </div>
                    <div>
                      {editingUserId === user.userId ? (
                        <input
                          type="tel"
                          name="mobileNo"
                          value={editFormData.mobileNo}
                          onChange={handleEditInputChange}
                          className="w-full px-2 py-1 border border-gray-300 rounded-md"
                        />
                      ) : (
                        user.mobileNo
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      {editingUserId === user.userId ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="text-green-600 hover:text-green-800"
                            title="Save"
                          >
                            <Check />
                          </button>
                          <button
                            onClick={handleCancel}
                            className="text-red-600 hover:text-red-800"
                            title="Cancel"
                          >
                            <X />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleEdit(user)}
                            className="text-blue-600 hover:text-blue-800"
                            title="Edit"
                          >
                            <Edit />
                          </button>
                          <button
                            onClick={() => handleDelete(user.userId)}
                            className="text-red-600 hover:text-red-800"
                            title="Delete"
                          >
                            <Trash2 />
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))
              )}
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
