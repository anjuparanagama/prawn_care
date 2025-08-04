import PurchaseUpper from "../components/PurchaseUpper";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
     <div className="flex min-h-screen">
      {/* Sidebar on the left */}
      <Navbar />

      {/* Main content area on the right (stacked vertically) */}
      <div className="flex-grow flex flex-col p-6 gap-6 ml-[250px] bg-gray-50">
        <PurchaseUpper />
        
      </div>
    </div>
  );
}
