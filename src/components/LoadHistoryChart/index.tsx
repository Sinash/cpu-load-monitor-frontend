import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

// Register the necessary components from Chart.js
ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

// Define the data structure for the chart data
interface DataPoint {
  timestamp: string;
  value: number;
}

const LoadHistoryChart: React.FC = () => {
  const [chartData, setChartData] = useState<DataPoint[]>([]);

  // Function to generate mock CPU load data for demo purposes
  const generateCpuLoad = (): number => {
    return Math.random() * 100; // Random CPU load between 0 and 100
  };

  useEffect(() => {
    const fetchData = () => {
      const newPoint: DataPoint = {
        timestamp: new Date().toISOString(),
        value: generateCpuLoad(),
      };

      // Add new data point and retain only the last 10 minutes
      setChartData((prevData) => {
        const tenMinutesAgo = Date.now() - 10 * 60 * 1000; // 10 minutes ago
        const updatedData = [...prevData, newPoint].filter(
          (dp) => new Date(dp.timestamp).getTime() >= tenMinutesAgo
        );
        return updatedData;
      });
    };

    // Fetch data every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Clean up the interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Prepare the data for the chart
  const data = {
    labels: chartData.map((dp) => new Date(dp.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'CPU Load Average (Normalized)',
        data: chartData.map((dp) => dp.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  // Define the chart options with explicit axis types and literal values
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'CPU Load History (Last 10 Minutes)',
      },
    },
    scales: {
      x: {
        type: 'category',
        title: {
          display: true,
          text: 'Time',
        },
      },
      y: {
        type: 'linear',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Load Average',
        },
        ticks: {
          callback: function (tickValue: string | number) {
            if (typeof tickValue === 'number') {
              return tickValue.toFixed(2); // Format the number to 2 decimal places
            }
            return tickValue;
          },
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={chartOptions} />
    </div>
  );
};

export default LoadHistoryChart;
