"use client";
import React, { useEffect, useState, useRef } from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function Graph() {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState({
    labels: monthNames,
    datasets: [
      {
        label: new Date().getFullYear().toString(),
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3b82f6",
        data: Array(12).fill(0),
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#3b82f6",
        pointBorderColor: "#3b82f6",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  });

  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Fetch total revenue
    const fetchTotalRevenue = async () => {
      try {
        const response = await fetch("/api/sales/revenue");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        // Ensure we have a valid number, default to 0 if not
        setTotalRevenue(typeof data.totalRevenue === 'number' ? data.totalRevenue : 
                      (data.totalRevenue !== null && data.totalRevenue !== undefined) ? parseFloat(data.totalRevenue) || 0 : 0);
      } catch (error) {
        console.error("Error fetching total revenue:", error);
        setTotalRevenue(0); 
      }
    };

   const fetchTotalSales = async () => {
  try {
    const response = await fetch("/api/sales/sales/count");
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    setTotalSales(typeof data.totalSales === 'number' ? data.totalSales : 0);
  } catch (error) {
    console.error("Error fetching total sales:", error);
    setTotalSales(0);
  }
};


    // Fetch monthly revenue and update chart data
    const fetchMonthlyRevenue = async () => {
      try {
        const response = await fetch("/api/sales/revenue/monthly");
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();

        const revenueMap = {};
        if (data.results && Array.isArray(data.results)) {
          data.results.forEach(({ month, revenue }) => {
            revenueMap[month] = parseFloat(revenue) || 0;
          });
        }

        const monthlyData = monthNames.map((month) => revenueMap[month] || 0);

        setChartData((prevData) => ({
          ...prevData,
          labels: monthNames,
          datasets: [
            {
              ...prevData.datasets[0],
              data: monthlyData,
            },
          ],
        }));
      } catch (error) {
        console.error("Error fetching monthly revenue:", error);
      }
    };

    const fetchData = async () => {
      setIsLoading(true);
      await Promise.all([
        fetchTotalRevenue(),
        fetchTotalSales(),
        fetchMonthlyRevenue()
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Initialize or update Chart.js chart when chartData changes
  useEffect(() => {
    const loadChartJS = () => {
      if (typeof window.Chart === "undefined") {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js";
        script.onload = () => createChart();
        document.head.appendChild(script);
      } else {
        createChart();
      }
    };

    const createChart = () => {
      if (!chartRef.current) return;

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");

      const config = {
        type: "line",
        data: chartData,
        options: {
          maintainAspectRatio: false,
          responsive: true,
          plugins: {
            legend: { display: false },
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
                font: { size: 12 },
              },
              grid: { display: false },
              border: { display: false },
            },
            y: {
              ticks: {
                color: "rgba(0,0,0,0.7)",
                font: { size: 12 },
              },
              grid: {
                color: "rgba(0,0,0,0.1)",
                drawBorder: false,
              },
              border: { display: false },
            },
          },
          interaction: {
            intersect: false,
            mode: "index",
          },
        },
      };

      chartInstanceRef.current = new window.Chart(ctx, config);
    };

    loadChartJS();

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(20);
    doc.text("Sales Report", 10, 10);
    doc.setFontSize(12);
    // Safe handling of potentially undefined values
    doc.text(`Total Sales Revenue: Rs. ${(totalRevenue || 0).toLocaleString()}`, 10, 30);
    doc.text(`Total Sales: ${totalSales || 0}`, 10, 40);
    const canvas = chartRef.current;
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      doc.addImage(imgData, "PNG", 10, 50, 180, 90);
    }
    doc.save("sales_report.pdf");
  };

  // Safe rendering with fallback values
  const safeRevenue = totalRevenue || 0;
  const safeSales = totalSales || 0;

  return (
    <div className="w-full mx-auto px-4">
      {isLoading && (
          <div className="text-gray-500">Loading...</div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Sales Revenue</p>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-blue-600">
                    Rs.{safeRevenue}
                  </span>
                </div>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-lg">Rs.</span>
              </div>
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Sales</p>
                <span className="text-2xl font-bold text-gray-900">{safeSales}</span>
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
                <canvas id="line-chart" ref={chartRef}></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}