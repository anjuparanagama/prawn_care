"use client";
import React, { useState, useRef, useEffect } from "react";
import { FiSearch, FiFilter } from "react-icons/fi";

const STATUS_OPTIONS = [
  { value: "", label: "All" },
  { value: "New", label: "New" },
  { value: "Processing", label: "Processing" },
  { value: "Completed", label: "Completed" },
];

export default function Searchbar({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleFilter = () => {
    if (onFilter) {
      onFilter({ searchTerm, selectedStatus });
    }
    console.log("Search Term:", searchTerm, "Selected Status:", selectedStatus);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1">
          <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
            <FiSearch className="w-5 h-5" />
          </span>
          <input
            type="text"
            placeholder="Search Orders..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-lg text-gray-500 bg-white hover:bg-gray-100 transition"
            aria-label="Filter"
            onClick={() => setDropdownOpen((open) => !open)}
          >
            <FiFilter className="w-5 h-5" />
          </button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <ul className="py-1">
                {STATUS_OPTIONS.map((option) => (
                  <li key={option.value}>
                    <button
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                        selectedStatus === option.value
                          ? "bg-blue-50 text-blue-600 font-semibold"
                          : "text-gray-700"
                      }`}
                      onClick={() => {
                        setSelectedStatus(option.value);
                        setDropdownOpen(false);
                      }}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={handleFilter}
        >
          Search
        </button>
      </div>
    </div>
  );
}