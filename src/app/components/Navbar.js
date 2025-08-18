"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaTachometerAlt, FaShoppingCart, FaFileAlt, FaBoxes, FaCog, FaSignOutAlt, FaChevronDown, FaChevronUp } from "react-icons/fa";
import LogoutModal from "./LogoutModal";

export default function Navbar() {
  const pathname = usePathname();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <>
      <div className="w-64 h-screen bg-white shadow-lg flex flex-col justify-between fixed">
        <div>
          <h1 className="text-3xl font-bold text-blue-600 tracking-wider p-6">
            Prawn care
          </h1>

          <nav className="flex flex-col gap-2 px-4">
            <SidebarItem icon={<FaTachometerAlt />} label="Dashboard" href="/" active={pathname === "/"} />
            <SidebarItem icon={<FaShoppingCart />} label="Orders" href="/Orderlist" active={pathname === "/Orderlist"} />
            <SidebarDropdown
              icon={<FaFileAlt />}
              label="Reports"
              items={["Sales", "Purchasing", "Water Quality"]}
              active={pathname.startsWith("/Sale") || pathname.startsWith("/report") || pathname.startsWith("/waterquality")}
            />
            <SidebarItem icon={<FaBoxes />} label="Inventory" href="/Inventory" active={pathname === "/Inventory"} />
            <SidebarItem icon={<FaCog />} label="Settings" href="/Settings" active={pathname === "/Settings"} />
          </nav>
        </div>

        <button 
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center gap-3 text-gray-700 px-6 py-4 hover:bg-gray-100"
        >
          <FaSignOutAlt />
          <span>Log Out</span>
        </button>
      </div>

      <LogoutModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={() => setShowLogoutModal(false)}
      />
    </>
  );
}

function SidebarItem({ icon, label, active = false, href }) {
  const content = (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer ${
        active
          ? "bg-blue-100 text-blue-600"
          : "text-gray-700 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span>{label}</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

function SidebarDropdown({ icon, label, items, active = false }) {
  const [open, setOpen] = useState(active);

  const routeMap = {
    Sales: "/Sale",
    Purchasing: "/Report",
    "Water Quality": "/waterquality",
  };

  return (
    <>
      <div onClick={() => setOpen(!open)}
        className={`flex items-center justify-between px-4 py-3 rounded-lg cursor-pointer ${
          active || open
            ? "bg-blue-100 text-blue-600"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </div>

      {open && (
        <div className="ml-10 mt-1 flex flex-col gap-1 text-sm text-gray-600">
          {items.map((item) => (
            <Link
              key={item}
              href={routeMap[item] || "#"}
              className="px-2 py-2 rounded hover:bg-gray-200 cursor-pointer block"
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
