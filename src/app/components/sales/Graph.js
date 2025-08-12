"use client";
import React, { useEffect, useState } from "react";

export default function Graph() {

  const [chartData, setChartData] = useState({
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: new Date().getFullYear().toString(),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3b82f6",
        data: [65, 78, 90, 88, 92, 95, 100],
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#3b82f6",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  useEffect(() => {
    const loadChartJS = async () => {
      // Load Chart.js from CDN if not already loaded
      if (typeof window.Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
        script.onload = () => createChart();
        document.head.appendChild(script);
      } else {
        createChart();
      }
    };

    const createChart = () => {
      let filteredLabels = chartData.labels;
      let filteredData2025 = chartData.datasets[0].data;

      const config = {
        type: "line",
        data: {
          labels: filteredLabels,
          datasets: [
            {
              label: "Revenue",
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderColor: "#3b82f6",
              data: filteredData2025,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#3b82f6",
              pointBorderColor: "#3b82f6",
              pointRadius: 4,
              pointHoverRadius: 6,
              borderWidth: 2,
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: { 
              display: false 
            },
            tooltip: { 
              mode: "index", 
              intersect: false,
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              titleColor: "white",
              bodyColor: "white",
              borderColor: "#3b82f6",
              borderWidth: 1,
            },
          },
          scales: {
            x: { 
              ticks: { 
                color: "rgba(0,0,0,0.7)",
                font: { size: 12 }
              }, 
              grid: { display: false },
              border: { display: false }
            },
            y: { 
              ticks: { 
                color: "rgba(0,0,0,0.7)",
                font: { size: 12 }
              }, 
              grid: { 
                color: "rgba(0,0,0,0.1)",
                drawBorder: false
              },
              border: { display: false }
            },
          },
          interaction: {
            intersect: false,
            mode: 'index',
          },
        },
      };

      const ctx = document.getElementById("line-chart");
      if (ctx && window.Chart) {
        // Clear any existing chart
        if (window.Chart.getChart(ctx)) {
          window.Chart.getChart(ctx).destroy();
        }
        new window.Chart(ctx.getContext("2d"), config);
      }
    };

    loadChartJS();
  }, []);

  return (
    <div className="w-full mx-auto px-4 pb-3">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600">Rs. 100,000</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-lg">$</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Orders</p>
                <span className="text-2xl font-bold text-gray-900">25</span>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
            <div className="p-6">
              <div className="relative w-full h-[180px]">
                <canvas id="line-chart"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}