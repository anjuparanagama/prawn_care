"use client";
import { GiChemicalDrop, GiEnergyTank } from "react-icons/gi";
import { WiThermometer } from "react-icons/wi";

function Box() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Average pH */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-row items-center gap-4">
        <GiChemicalDrop className=" text-3xl" />
        <div>
          <div className="font-bold text-gray-500">Average pH</div>
          <div className="text-2xl font-bold text-blue-600">7.2</div>
          <div className="text-sm text-gray-500">Optimal Range : 7.0 - 7.8</div>
        </div>
      </div>
      {/* Average O₂ */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-row items-center gap-4">
        <GiEnergyTank className=" text-3xl" />
        <div>
          <div className="font-bold text-gray-500">Average O₂</div>
          <div className="text-2xl font-bold text-blue-600">6.0 ppm</div>
          <div className="text-sm text-gray-500">Optimal Range : 6.0 - 6.0</div>
        </div>
      </div>
      {/* Average Temp */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-row items-center gap-4">
        <WiThermometer className=" text-3xl" />
        <div>
          <div className="font-bold text-gray-500">Average Temp.</div>
          <div className="text-2xl font-bold text-blue-600">28.2 °C</div>
          <div className="text-sm text-gray-500">Optimal Range : 25.0 - 32.0</div>
        </div>
      </div>
    </div>
  );
}

export default Box;
