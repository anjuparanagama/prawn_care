import Navbar from "../components/Navbar";
import Upper from "../components/Inventory/Upper";
import MiddleOne from "../components/Inventory/MiddleOne";
import Bottom from "../components/Inventory/Bottom";

export default function Home() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Navbar />

      {/* Main content area on the right (stacked vertically) */}
      <div className="flex-grow flex flex-col p-4 py-0 gap-6 ml-[250px] ">
        <Upper />
        <MiddleOne />
        <Bottom/>
      </div>
    </div>
  );
}
