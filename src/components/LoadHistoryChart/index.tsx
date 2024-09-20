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
import { fetchLoadHistory } from '../../services/cpuService'; // Import the service function

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
  const [error, setError] = useState<string | null>(null);

  // Function to fetch real CPU load data from the backend
  const loadCpuHistoryData = async () => {
    try {
      const response = await fetchLoadHistory(); // Fetch data from the backend
      const transformedData = response.map((data) => ({
        timestamp: data.timestamp,
        value: data.loadAverage,
      }));
      setChartData(transformedData);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Failed to fetch data from the backend');
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch the initial data when the component mounts
    loadCpuHistoryData();

    // Fetch data every 10 seconds
    const interval = setInterval(loadCpuHistoryData, 10000);

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
      {error ? <p>{error}</p> : <Line data={data} options={chartOptions} />}
    </div>
  );
};

export default LoadHistoryChart;
