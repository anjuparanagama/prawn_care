// app/graph/page.js
"use client";
import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Graph() {
  const [view, setView] = useState("Monthly");
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Current Year",
        backgroundColor: "#3b82f6",
        borderColor: "#3b82f6",
        data: [],
        fill: false,
        tension: 0.1,
      },
      {
        label: "Previous Year",
        backgroundColor: "#e5e7eb",
        borderColor: "#e5e7eb",
        data: [],
        fill: false,
        tension: 0.1,
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      let url = '';
      if (view === "Monthly") {
        url = '/api/orders/orders/monthly';
      } else if (view === "Weekly") {
        url = '/api/orders/orders/weekly';
      } else if (view === "Daily") {
        url = '/api/orders/orders/daily';
      }

      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`${view} data:`, data);

        if (view === "Monthly") {
          // Process monthly data only
          const currentYearData = Array(12).fill(0);
          const prevYearData = Array(12).fill(0);
          
          data.forEach(item => {
            if (item.month) {
              const monthIndex = parseInt(item.month.split('-')[1]) - 1;
              if (item.year === new Date().getFullYear()) {
                currentYearData[monthIndex] = item.total_quantity || 0;
              } else if (item.year === new Date().getFullYear() - 1) {
                prevYearData[monthIndex] = item.total_quantity || 0;
              }
            }
          });

          setChartData({
            labels: monthNames,
            datasets: [
              {
                label: new Date().getFullYear().toString(),
                backgroundColor: "#3b82f6",
                borderColor: "#3b82f6",
                data: currentYearData,
                fill: false,
                tension: 0.1,
              },
              {
                label: (new Date().getFullYear() - 1).toString(),
                backgroundColor: "#e5e7eb",
                borderColor: "#e5e7eb",
                data: prevYearData,
                fill: false,
                tension: 0.1,
              },
            ],
          });
        } else if (view === "Weekly") {
          // Process weekly data only
          const currentYear = new Date().getFullYear();
          const currentYearWeeks = data.filter(item => item.year === currentYear);
          const prevYearWeeks = data.filter(item => item.year === currentYear - 1);
          
          // Get all unique weeks for current year and sort them
          const allWeeks = [...new Set(data.map(item => item.week))].sort((a, b) => a - b);
          
          const currentYearData = allWeeks.map(week => {
            const weekData = currentYearWeeks.find(item => item.week === week);
            return weekData ? weekData.total_quantity : 0;
          });
          
          const prevYearData = allWeeks.map(week => {
            const weekData = prevYearWeeks.find(item => item.week === week);
            return weekData ? weekData.total_quantity : 0;
          });

          const labels = allWeeks.map(week => `Week ${week}`);

          setChartData({
            labels,
            datasets: [
              {
                label: new Date().getFullYear().toString(),
                backgroundColor: "#3b82f6",
                borderColor: "#3b82f6",
                data: currentYearData,
                fill: false,
                tension: 0.1,
              },
              {
                label: (new Date().getFullYear() - 1).toString(),
                backgroundColor: "#e5e7eb",
                borderColor: "#e5e7eb",
                data: prevYearData,
                fill: false,
                tension: 0.1,
              },
            ],
          });
        } else if (view === "Daily") {
          // Process daily data only
          const currentYear = new Date().getFullYear();
          const currentYearDays = data.filter(item => item.year === currentYear);
          const prevYearDays = data.filter(item => item.year === currentYear - 1);
          
          // Get all unique days and sort them
          const allDays = [...new Set(data.map(item => item.day))].sort();
          
          const currentYearData = allDays.map(day => {
            const dayData = currentYearDays.find(item => item.day === day);
            return dayData ? dayData.total_quantity : 0;
          });
          
          const prevYearData = allDays.map(day => {
            const dayData = prevYearDays.find(item => item.day === day);
            return dayData ? dayData.total_quantity : 0;
          });

          setChartData({
            labels: allDays,
            datasets: [
              {
                label: new Date().getFullYear().toString(),
                backgroundColor: "#3b82f6",
                borderColor: "#3b82f6",
                data: currentYearData,
                fill: false,
                tension: 0.1,
              },
              {
                label: (new Date().getFullYear() - 1).toString(),
                backgroundColor: "#e5e7eb",
                borderColor: "#e5e7eb",
                data: prevYearData,
                fill: false,
                tension: 0.1,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [view]);

  useEffect(() => {
    const ctx = document.getElementById("line-chart");
    if (!ctx) return;

    const config = {
      type: "line",
      data: chartData,
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: { 
            labels: { color: "black" }, 
            align: "end", 
            position: "bottom" 
          },
          tooltip: { 
            mode: "index", 
            intersect: false 
          },
        },
        scales: {
          x: { 
            ticks: { color: "rgba(0,0,0,0.7)" }, 
            grid: { display: false } 
          },
          y: { 
            ticks: { color: "rgba(0,0,0,0.7)" }, 
            grid: { display: false },
            beginAtZero: true,
            suggestedMax: 200
          },
        },
      },
    };

    const myLine = new Chart(ctx, config);

    return () => myLine.destroy();
  }, [chartData]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-6">
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
