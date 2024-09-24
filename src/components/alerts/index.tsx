import React, { useEffect, useState } from 'react';
import { AlertsResponse, fetchAlerts } from '../../services/cpuService';
import './scss/index.scss'; // Import alert-specific styles

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

  if (loading) return <div className="loading">Loading Alerts...</div>;

  const hasNoAlerts =
    alerts?.highLoadAlerts.length === 0 && alerts?.recoveryAlerts.length === 0;

  return (
    <div className="alerts">
      <h2>Alerts</h2>
      {hasNoAlerts ? (
        <div className="no-alerts">No Alerts Yet</div>
      ) : (
        <div className="alert-container">
          <div className="high-alerts">
            <h3>High Load Alerts</h3>
            <ul>
              {alerts?.highLoadAlerts.map((alert, index) => (
                <li key={index} className="high-alert-item">
                  Start: {formatTimestamp(alert.startTime)}, End:{' '}
                  {formatTimestamp(alert.endTime)}
                </li>
              ))}
            </ul>
          </div>
          <div className="recovery-alerts">
            <h3>Recovery Alerts</h3>
            <ul>
              {alerts?.recoveryAlerts.map((alert, index) => (
                <li key={index} className="recovery-alert-item">
                  Start: {formatTimestamp(alert.startTime)}, End:{' '}
                  {formatTimestamp(alert.endTime)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Alerts;
