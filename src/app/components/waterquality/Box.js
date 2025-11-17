"use client";
import { GiChemicalDrop, GiEnergyTank } from "react-icons/gi";
import { WiThermometer } from "react-icons/wi";
import { useState, useEffect } from "react";

function Box() {
  const [averagePH, setAveragePH] = useState(null);
  const [loadingPH, setLoadingPH] = useState(true);
  const [errorPH, setErrorPH] = useState(null);
  const [averageTemp, setAverageTemp] = useState(null);
  const [loadingTemp, setLoadingTemp] = useState(true);
  const [errorTemp, setErrorTemp] = useState(null);
  const [averageTDS, setAverageTDS] = useState(null);
  const [loadingTDS, setLoadingTDS] = useState(true);
  const [errorTDS, setErrorTDS] = useState(null);

  useEffect(() => {
    async function fetchAveragePH() {
      try {
        const response = await fetch("http://localhost:5000/api/waterquality/average-ph");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAveragePH(data.average_pH);
      } catch (err) {
        setErrorPH(err.message);
      } finally {
        setLoadingPH(false);
      }
    }
    fetchAveragePH();
  }, []);

  useEffect(() => {
    async function fetchAverageTemp() {
      try {
        const response = await fetch("http://localhost:5000/api/waterquality/average-temperature");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAverageTemp(data.average_temperature);
      } catch (err) {
        setErrorTemp(err.message);
      } finally {
        setLoadingTemp(false);
      }
    }
    fetchAverageTemp();
  }, []);

  useEffect(() => {
    async function fetchAverageTDS() {
      try {
        const response = await fetch("http://localhost:5000/api/waterquality/average-tds");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAverageTDS(data.average_tds);
      } catch (err) {
        setErrorTDS(err.message);
      } finally {
        setLoadingTDS(false);
      }
    }
    fetchAverageTDS();
  }, []);

  return (
    <div className="p-2 grid grid-cols-1 -mt-16 md:grid-cols-3 gap-6">
      {/* Average pH */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-row items-center gap-4">
        <GiChemicalDrop className=" text-3xl" />
        <div>
          <div className="font-bold  text-gray-500">Average pH</div>
          <div className="text-2xl font-bold text-blue-900">
            {loadingPH ? "Loading..." : errorPH ? `Error: ${errorPH}` : averagePH}
          </div>
          <div className="text-sm text-gray-500">Optimal Range : 6.0 - 7.8</div>
        </div>
      </div>
      {/* Average Salinity */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-row items-center gap-4">
        <GiEnergyTank className=" text-3xl" />
        <div>
          <div className="font-bold text-gray-500">Average Salinity</div>
          <div className="text-2xl font-bold text-blue-900">
            {loadingTDS ? "Loading..." : errorTDS ? `Error: ${errorTDS}` : `${averageTDS} ppm`}
          </div>
          <div className="text-sm text-gray-500">Optimal Range : 40.0 - 100.0 NTU</div>
        </div>
      </div>
      {/* Average Temp */}
      <div className="bg-white p-4 rounded-lg shadow-md flex flex-row items-center gap-4">
        <WiThermometer className=" text-3xl" />
        <div>
          <div className="font-bold text-gray-500">Average Temp.</div>
          <div className="text-2xl font-bold text-blue-900">
            {loadingTemp ? "Loading..." : errorTemp ? `Error: ${errorTemp}` : `${averageTemp} °C`}
          </div>
          <div className="text-sm text-gray-500">Optimal Range : 25.0 - 32.0 °C</div>
        </div>
      </div>
    </div>
  );
}

export default Box;
