// src/components/Alerts.tsx

import React, { useEffect, useState } from 'react';
import { AlertsResponse, fetchAlerts } from '../../services/cpuService';

const Alerts: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAlerts = async () => {
      try {
        const data = await fetchAlerts();
        setAlerts(data);
      } catch (error) {
        console.error('Failed to fetch alerts', error);
      } finally {
        setLoading(false);
      }
    };

    getAlerts();

    // Polling every 10 seconds
    const interval = setInterval(getAlerts, 10000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const formatTimestamp = (timestamp: string | undefined | null) => {
    if (!timestamp) return 'Ongoing';
    const date = new Date(timestamp);
    return date.toLocaleString(); // Converts to a readable format
  };

  if (loading) return <div>Loading Alerts...</div>;

  return (
    <div>
      <h2>Alerts</h2>
      <h3>High Load Alerts</h3>
      <ul>
        {alerts?.highLoadAlerts.map((alert, index) => (
          <li key={index}>
            Start: {formatTimestamp(alert.startTime)}, End:{' '}
            {formatTimestamp(alert.endTime)}
          </li>
        ))}
      </ul>
      <h3>Recovery Alerts</h3>
      <ul>
        {alerts?.recoveryAlerts.map((alert, index) => (
          <li key={index}>
            Start: {formatTimestamp(alert.startTime)}, End:{' '}
            {formatTimestamp(alert.endTime)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
