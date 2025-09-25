"use client";
import { useRouter } from "next/navigation";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    router.push('/Login');
  };

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-lg p-6 w-80 shadow-2xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Logout
        </h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to logout?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded hover:bg-gray-200 transition"
          >
            No
          </button>
          <button
            onClick={() => {
              handleLogout();
              onConfirm();
            }}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
