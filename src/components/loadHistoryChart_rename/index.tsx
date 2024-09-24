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
import annotationPlugin, { AnnotationOptions } from 'chartjs-plugin-annotation';
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchAlerts, fetchLoadHistory } from '../../services/cpuService';
import './scss/index.scss'; // Import your CSS file

// Register necessary Chart.js components and the annotation plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin
);

interface DataPoint {
  timestamp: string;
  value: number;
}

const LoadHistoryChart: React.FC = () => {
  const [chartData, setChartData] = useState<DataPoint[]>([]);
  const [alerts, setAlerts] = useState<{
    highLoadAlerts: any[];
    recoveryAlerts: any[];
  }>({ highLoadAlerts: [], recoveryAlerts: [] });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loadHistory = await fetchLoadHistory();
        const transformedData = loadHistory.map((data) => ({
          timestamp: data.timestamp,
          value: data.loadAverage,
        }));
        setChartData(transformedData);
      } catch (error) {
        console.error('Error fetching load history: ', error);
        setError(true);
      }

      try {
        const alertData = await fetchAlerts();
        setAlerts(alertData);
      } catch (error) {
        console.error('Error fetching alerts: ', error);
        setError(true);
      }

      setLoading(false);
    };

    fetchData();

    // Polling every 10 seconds
    const interval = setInterval(fetchData, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || chartData.length === 0) {
    return <div>Error loading data</div>; // Return an error message or fallback UI if there's an error
  }

  const annotations: Partial<AnnotationOptions>[] = [];

  // Add annotations for high load alerts
  alerts.highLoadAlerts.forEach((alert, index) => {
    const startIndex = chartData.findIndex(
      (dp) => new Date(dp.timestamp) >= new Date(alert.startTime)
    );

    const endIndex = alert.endTime
      ? chartData.findIndex(
          (dp) => new Date(dp.timestamp) >= new Date(alert.endTime)
        )
      : chartData.length - 1;

    if (startIndex !== -1 && endIndex !== -1) {
      annotations.push({
        type: 'box',
        xMin: startIndex,
        xMax: endIndex,
        backgroundColor: 'rgba(255, 0, 0, 0.25)', // Red for high load
        borderColor: 'rgba(255, 0, 0, 1)',
        borderWidth: 1,
        label: {
          content: `High Load ${index + 1}`,
          enabled: true,
          position: 'center',
        },
      });
    }
  });

  // Add annotations for recovery alerts
  alerts.recoveryAlerts.forEach((alert, index) => {
    const startIndex = chartData.findIndex(
      (dp) => new Date(dp.timestamp) >= new Date(alert.startTime)
    );

    const endIndex = chartData.findIndex(
      (dp) => new Date(dp.timestamp) >= new Date(alert.endTime)
    );

    if (startIndex !== -1 && endIndex !== -1) {
      annotations.push({
        type: 'box',
        xMin: startIndex,
        xMax: endIndex,
        backgroundColor: 'rgba(255, 165, 0, 0.25)', // Amber for recovery
        borderColor: 'rgba(255, 165, 0, 1)',
        borderWidth: 1,
        label: {
          content: `Recovery ${index + 1}`,
          enabled: true,
          position: 'center',
        },
      });
    }
  });

  const data = {
    labels: chartData.map((dp) => new Date(dp.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: 'CPU Load Average (Normalized)',
        data: chartData.map((dp) => dp.value),
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
        fill: false,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to resize freely
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'CPU Load History (with High Load and Recovery Alerts)',
      },
      annotation: {
        annotations,
      } as any,
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
              return tickValue.toFixed(2);
            }
            return tickValue;
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default LoadHistoryChart;
