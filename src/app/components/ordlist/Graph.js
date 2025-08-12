// app/graph/page.js
"use client";
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

export default function Graph() {
  const [view, setView] = useState("Monthly");
  const [startDate, setStartDate] = useState("2025-01-01");
  const [endDate, setEndDate] = useState("2025-07-31");
  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: new Date().getFullYear().toString(),
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
        data: [65, 78, 66, 44, 56, 67, 75],
        fill: false,
        tension: 0.1,
      },
      {
        label: (new Date().getFullYear() - 1).toString(),
        backgroundColor: "#e5e7eb",
        borderColor: "#e5e7eb",
        data: [40, 68, 86, 74, 56, 60, 87],
        fill: false,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const dailyLabels = [
      "2025-05-01", "2025-05-02", "2025-05-03", "2025-05-04",
      "2025-05-05", "2025-05-06", "2025-05-07",
    ];
    const weeklyLabels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    const weeklyData2025 = [50, 60, 70, 75];
    const weeklyData2024 = [45, 55, 65, 70];
    const dailyData2025 = [10, 15, 12, 20, 18, 25, 22];
    const dailyData2024 = [8, 12, 10, 15, 14, 20, 18];

    let filteredLabels = [];
    let filteredData2025 = [];
    let filteredData2024 = [];

    if (view === "Monthly") {
      filteredLabels = chartData.labels;
      filteredData2025 = chartData.datasets[0].data;
      filteredData2024 = chartData.datasets[1].data;
    } else if (view === "Weekly") {
      filteredLabels = weeklyLabels;
      filteredData2025 = weeklyData2025;
      filteredData2024 = weeklyData2024;
    } else if (view === "Daily") {
      filteredLabels = dailyLabels;
      filteredData2025 = dailyData2025;
      filteredData2024 = dailyData2024;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (view === "Monthly") {
      const monthMap = {
        January: 0, February: 1, March: 2, April: 3,
        May: 4, June: 5, July: 6,
      };
      filteredLabels = chartData.labels.filter((label) => {
        const month = monthMap[label];
        const date = new Date(2025, month, 1);
        return date >= start && date <= end;
      });
      const startIndex = chartData.labels.indexOf(filteredLabels[0]);
      const endIndex = chartData.labels.indexOf(filteredLabels[filteredLabels.length - 1]);
      filteredData2025 = chartData.datasets[0].data.slice(startIndex, endIndex + 1);
      filteredData2024 = chartData.datasets[1].data.slice(startIndex, endIndex + 1);
    } else if (view === "Daily") {
      filteredLabels = dailyLabels.filter((label) => {
        const date = new Date(label);
        return date >= start && date <= end;
      });
      const startIndex = dailyLabels.indexOf(filteredLabels[0]);
      const endIndex = dailyLabels.indexOf(filteredLabels[filteredLabels.length - 1]);
      filteredData2025 = dailyData2025.slice(startIndex, endIndex + 1);
      filteredData2024 = dailyData2024.slice(startIndex, endIndex + 1);
    }

    const config = {
      type: "line",
      data: {
        labels: filteredLabels,
        datasets: [
          {
            label: new Date().getFullYear().toString(),
            backgroundColor: "#3b82f6",
            borderColor: "#3b82f6",
            data: filteredData2025,
            fill: false,
            tension: 0.1,
          },
          {
            label: (new Date().getFullYear() - 1).toString(),
            backgroundColor: "#e5e7eb",
            borderColor: "#e5e7eb",
            data: filteredData2024,
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { labels: { color: "black" }, align: "end", position: "bottom" },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: { ticks: { color: "rgba(0,0,0,0.7)" }, grid: { display: false } },
          y: { ticks: { color: "rgba(0,0,0,0.7)" }, grid: { display: false } },
        },
      },
    };

    const ctx = document.getElementById("line-chart").getContext("2d");
    const myLine = new Chart(ctx, config);

    return () => myLine.destroy();
  }, [view, startDate, endDate]);

  return (
    <div className="w-full max-w-[1175px] mx-auto mt-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0 sm:space-x-4">
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Daily">Daily</option>
            </select>
            
          </div>
          <div className="relative w-full h-[360px]">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}