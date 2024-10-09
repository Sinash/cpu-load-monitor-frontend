// components/alerts/index.tsx

import React from 'react';
import { AlertsResponse } from '../../services/cpuService';
import './scss/index.scss';

interface AlertsProps {
  alerts: AlertsResponse;
}

const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
  const formatTimestamp = (timestamp: string | undefined | null) => {
    if (!timestamp) return 'Ongoing';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  const hasNoAlerts =
    alerts.highLoadAlerts.length === 0 && alerts.recoveryAlerts.length === 0;

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
              {alerts.highLoadAlerts.map((alert, index) => (
                <li key={index}>
                  Start: {formatTimestamp(alert.startTime)}, End:{' '}
                  {formatTimestamp(alert.endTime)}
                </li>
              ))}
            </ul>
          </div>
          <div className="recovery-alerts">
            <h3>Recovery Alerts</h3>
            <ul>
              {alerts.recoveryAlerts.map((alert, index) => (
                <li key={index}>
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
