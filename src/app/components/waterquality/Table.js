"use client";
import React from "react";

function Table() {
  const groupedData = [
    {
      date: "2025/04/10",
      time: "06:00 am",
      tanks: [
        { tank: "01", o2: 6.2, ph: 6.2, temp: 6.2, nh3: 6.2 },
        { tank: "02", o2: 6.2, ph: 6.2, temp: 6.2, nh3: 6.2 },
        { tank: "03", o2: 6.2, ph: 6.2, temp: 6.2, nh3: 6.2 },
      ],
    },
    {
      date: "2025/04/10",
      time: "09:00 am",
      tanks: [
        { tank: "01", o2: 6.2, ph: 6.2, temp: 6.2, nh3: 6.2 },
        { tank: "02", o2: 6.2, ph: 6.2, temp: 6.2, nh3: 6.2 },
        { tank: "03", o2: 6.2, ph: 6.2, temp: 6.2, nh3: 6.2 },
      ],
    },
    {
      date: "2025/04/10",
      time: "12:00 pm",
      tanks: [
        { tank: "01", o2: 6.2, ph: 6.2, temp: 6.2, nh3: 6.2 },
        { tank: "02", o2: 6.2, ph: 6.2, temp: 6.2, nh3: 6.2 },
        { tank: "03", o2: 6.2, ph: 6.2, temp: 6.2, nh3: 6.2 },
      ],
    },
  ];

  return (
    <div className="pl-6 bg-white rounded-lg shadow-md">
      <table className="w-full text-left">
        <thead className="">
          <tr>
            <th className="py-2 pl-4 text-justify">Date</th>
            <th className="py-2 text-justify">Time</th>
            <th className="py-2 text-justify">Tank No:</th>
            <th className="py-2 text-justify">O₂ level (ppm)</th>
            <th className="py-2 text-justify">pH level</th>
            <th className="py-2 text-justify">Temperature (°C)</th>
            <th className="py-2 text-justify">NH₃ level</th>
          </tr>
        </thead>
        <tbody className="shadow">
          {groupedData.map((group, groupIdx) => (
            <React.Fragment key={group.time}>
              {group.tanks.map((tank, tankIdx) => (
                <tr key={group.time + tank.tank}>
                  {tankIdx === 0 && (
                    <>
                      {/* Add font-bold here */}
                      <td rowSpan={group.tanks.length} className="py-2 text-justify font-bold">{group.date}</td>
                      <td rowSpan={group.tanks.length} className="py-2 text-justify">{group.time}</td>
                    </>
                  )}
                  <td className="py-2 text-justify">{tank.tank}</td>
                  <td className="py-2 text-justify">{tank.o2}</td>
                  <td className="py-2 text-justify">{tank.ph}</td>
                  <td className="py-2 text-justify">{tank.temp}</td>
                  <td className="py-2 text-justify">{tank.nh3}</td>
                </tr>
              ))}
              {/* Gray horizontal line, partial width, between groups */}
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
