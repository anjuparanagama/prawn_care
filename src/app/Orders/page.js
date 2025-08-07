import Navbar from '../components/Navbar';
import OrderDetailsHeader from '../components/orderdetails/OrderDetailsHeader';
import OrderItem from '../components/orderdetails/OrderItem';
import CustomerInfo from '../components/orderdetails/CustomerInfo';
import OrderStatus from '../components/orderdetails/OrderStatus';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex flex-col lg:flex-row border border-gray-200">
        {/* Navbar - Full width on mobile, sidebar on desktop */}
        <div className="w-full lg:w-64 lg:min-h-screen bg-white flex-shrink-0">
          <Navbar />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 w-full lg:w-auto">
          <div className="p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
              {/* Order Details Card */}
              <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                <div className="p-4 sm:p-6 lg:p-8 border border-gray-200 rounded-lg">
                  <OrderDetailsHeader />
                  <OrderItem />
                </div>
              </div>
              
              {/* Bottom Cards */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <CustomerInfo />
                </div>
                <div className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200">
                  <OrderStatus />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}