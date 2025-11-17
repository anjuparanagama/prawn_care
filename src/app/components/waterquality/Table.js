"use client";
import React, { useState, useEffect } from "react";

function Table() {
  const [groupedData, setGroupedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/waterquality/sensor-data');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();

        // Transform data to grouped format
        const grouped = {};
        data.forEach(item => {
          const dateObj = new Date(item.Date);
          const date = dateObj.toISOString().split('T')[0].replace(/-/g, '/');
          const time = convertTime(item.Time);
          const key = `${date}-${time}`;
          if (!grouped[key]) {
            grouped[key] = {
              date,
              time,
              tanks: []
            };
          }
          grouped[key].tanks.push({
            tank: item.Pond_ID.toString(),
            o2: item.Water_Level,
            ph: item.pH,
            temp: item.WaterTemp,
            nh3: item.TDS
          });
        });

        const groupedArray = Object.values(grouped);
        setGroupedData(groupedArray);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const convertTime = (timeStr) => {
    const hour = parseInt(timeStr.split('.')[0]);
    const ampm = hour >= 12 ? 'pm' : 'am';
    const hour12 = hour % 12 || 12;
    return `${hour12.toString().padStart(2, '0')}:00 ${ampm}`;
  };

  if (loading) {
    return <div className="pl-6 bg-white rounded-lg shadow-md p-4">Loading...</div>;
  }

  if (error) {
    return <div className="pl-6 bg-white rounded-lg shadow-md p-4">Error: {error}</div>;
  }

  return (
    <div className="pl-6 bg-white rounded-lg shadow-md">
      <table className="w-full text-left">
        <thead className="">
          <tr>
            <th className="py-2 pl-4 text-center">Date</th>
            <th className="py-2 text-center">Time</th>
            <th className="py-2 text-center">Tank No:</th>
            <th className="py-2 text-center">Water Level (m)</th>
            <th className="py-2 text-center">pH level</th>
            <th className="py-2 text-center">Temperature (°C)</th>
            <th className="py-2 text-center">Salinity Level</th>
          </tr>
        </thead>
        <tbody className="">
          {groupedData.map((group, groupIdx) => (
            <React.Fragment key={`${group.date}-${group.time}`}>
          {group.tanks.map((tank, tankIdx) => (
            <tr key={`${group.date}-${group.time}-${tank.tank}`} className={(groupIdx + tankIdx) % 2 === 0 ? 'bg-blue-50' : ''}>
              {tankIdx === 0 && (
                <>
                  <td rowSpan={group.tanks.length} className="py-2 text-center font-bold text-blue-800">{group.date}</td>
                  <td rowSpan={group.tanks.length} className="py-2 text-center">{group.time}</td>
                </>
              )}
              <td className="py-2 text-center">{tank.tank}</td>
              <td className="py-2 text-center">{tank.o2}</td>
              <td className="py-2 text-center">{tank.ph}</td>
              <td className="py-2 text-center">{tank.temp}</td>
              <td className="py-2 text-center">{tank.nh3}</td>
            </tr>
          ))}
              {groupIdx < groupedData.length - 1 && (
                <tr>
                  <td colSpan={7} className="py-0">
                    <div className="mx-auto my-2 w-2/3 h-0.5 bg-white rounded"></div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
      <hr className="border-t-2 border-black my-2" />
      <div className="text-center mt-4 pb-3 cursor-pointer bg-white rounded-lg shadow-md">See All</div>
    </div>
  );
}

export default Table;
