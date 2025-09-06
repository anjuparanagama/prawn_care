'use client';
import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export default function CardLineChart() {
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);

  useEffect(() => {
    const fetchMonthlyRevenue = async () => {
      const response = await fetch('/api/dashboard/data');
      const data = await response.json();

      // Map API data to revenue per month, filling missing months with 0
      const revenueMap = {};
      data.forEach(item => {
        revenueMap[item.month] = item.revenue;
      });

      const revenueArray = MONTHS.map(month => revenueMap[month] || 0);
      setMonthlyRevenue(revenueArray);
    };

    fetchMonthlyRevenue();
  }, []);

  useEffect(() => {
    const ctx = document.getElementById("line-chart")?.getContext("2d");

    if (!ctx) return;

    const config = {
      type: "line",
      data: {
        labels: MONTHS,
        datasets: [
          {
            label: "Revenue",
            backgroundColor: "#3b82f6",
            borderColor: "#3b82f6",
            data: monthlyRevenue, // Now an array of numbers for each month
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            offset: true,
            ticks: {
              color: "#6b7280"
            },
            grid: {
              color: "#e5e7eb",
              borderDash: [4],
              offset: true,
            },
          },
          y: {
            min: 0,
            max: 1000000,
            ticks: { color: "#6b7280", stepSize: 50000 },
            grid: {
              color: "#e5e7eb",
              borderDash: [4],
            },
          },
        },
      },
    };

    const myChart = new ChartJS(ctx, config);

    return () => {
      myChart.destroy();
    };
  }, [monthlyRevenue]);

  return (
    <div className="bg-gray-100 rounded-xl shadow p-3 sm:p-6 mb-4 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3 sm:mb-4 gap-2 sm:gap-0">
        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-700">Revenue</h1>
        </div>
        <select className="border text-xs sm:text-sm px-2 py-1 rounded w-fit self-start sm:self-auto">
          <option>Monthly</option>
          <option>Quarterly</option>
        </select>
      </div>
      <div className="relative h-[250px] sm:h-[350px] w-full">
        <canvas id="line-chart" />
      </div>
    </div>
  );
}