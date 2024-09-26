// components/loadHistoryChart/index.tsx

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
import React from 'react';
import { Line } from 'react-chartjs-2';
import { AlertsResponse, LoadData } from '../../services/cpuService';
import './scss/index.scss'; // Import your CSS file

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

interface LoadHistoryChartProps {
  history: LoadData[];
  alerts: AlertsResponse;
}

const LoadHistoryChart: React.FC<LoadHistoryChartProps> = ({
  history,
  alerts,
}) => {
  const annotations: Partial<AnnotationOptions>[] = [];

  // Add annotations for high load alerts
  alerts.highLoadAlerts.forEach((alert, index) => {
    const startIndex = history.findIndex(
      (dp) =>
        alert.startTime && new Date(dp.timestamp) >= new Date(alert.startTime)
    );

    const endIndex = alert.endTime
      ? history.findIndex(
          (dp) =>
            alert.endTime && new Date(dp.timestamp) >= new Date(alert.endTime)
        )
      : history.length - 1;

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
    const startIndex = history.findIndex(
      (dp) =>
        alert.startTime && new Date(dp.timestamp) >= new Date(alert.startTime)
    );

    const endIndex = alert.endTime
      ? history.findIndex(
          (dp) =>
            alert.endTime && new Date(dp.timestamp) >= new Date(alert.endTime)
        )
      : history.length - 1;

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

  // components/loadHistoryChart/index.tsx
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
      timeZone: 'America/New_York', // Explicitly set the time zone
    }).format(date);
  };

  const data = {
    labels: history.map((dp) => formatTime(dp.timestamp)), // Use consistent formatting
    datasets: [
      {
        label: 'CPU Load Average (Normalized)',
        data: history.map((dp) => dp.loadAverage),
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
