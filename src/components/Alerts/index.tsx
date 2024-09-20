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
  }, []);

  if (loading) return <div>Loading Alerts...</div>;

  return (
    <div>
      <h2>Alerts</h2>
      <h3>High Load Alerts</h3>
      <ul>
        {alerts?.highLoadAlerts.map((alert, index) => (
          <li key={index}>
            Start: {alert.startTime}, End: {alert.endTime || 'Ongoing'}
          </li>
        ))}
      </ul>
      <h3>Recovery Alerts</h3>
      <ul>
        {alerts?.recoveryAlerts.map((alert, index) => (
          <li key={index}>
            Start: {alert.startTime}, End: {alert.endTime || 'Ongoing'}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
