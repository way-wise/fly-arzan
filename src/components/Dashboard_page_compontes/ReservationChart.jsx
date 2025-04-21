import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StyledChart = () => {
  const data = {
    labels: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Check in",
        data: [60, 40, 100, 50, 30, 90, 80],
        backgroundColor: "#353978", // Dark blue
        barThickness: 8, // Adjust bar width
        borderRadius: 8, // Rounded corners
      },
      {
        label: "Check Out",
        data: [30, 50, 80, 60, 40, 70, 90],
        backgroundColor: "#50ADD8", // Light blue
        barThickness: 8, // Adjust bar width
        borderRadius: 8, // Rounded corners
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right",
        labels: {
          usePointStyle: true,
          boxWidth: 8,
          font: {
            size: 14,
            family: "Arial, sans-serif",
            weight: "bold",
          },
        },
      },

    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
          color: "#555",
        },
      },
      y: {
        grid: {
          color: "#eee",
        },
        ticks: {
          stepSize: 20,
          font: {
            size: 14,
            family: "Arial, sans-serif",
          },
          color: "#555",
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        right: 20,
        bottom: 0,
        left: 20,
      },
    },
  };

  return (
    <div
      className="Bar-main-box"
    >
      <Bar data={data} options={options} />
    </div>
  );
};

export default StyledChart;
