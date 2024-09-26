// components/cpuLoad/index.tsx

import React from 'react';
import { CpuLoadResponse } from '../../services/cpuService';
import './scss/index.scss';

interface CpuLoadProps {
  currentLoad: CpuLoadResponse | null; // Allow null values
}

const CpuLoad: React.FC<CpuLoadProps> = ({ currentLoad }) => {
  if (!currentLoad) {
    return <div className="cpu-load">No CPU Load Data Available</div>; // Handle null case
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="cpu-load">
      <h2>Current CPU Load</h2>
      <div className="cpu-load-info">
        <p>
          <strong>Load Average:</strong> {currentLoad.loadAverage} |{' '}
          <strong>Status:</strong>{' '}
          <span
            className={currentLoad.isHighLoad ? 'high-load' : 'normal-load'}
          >
            {currentLoad.isHighLoad ? 'High Load' : 'Normal'}
          </span>{' '}
          | <strong>Timestamp:</strong> {formatTimestamp(currentLoad.timestamp)}
        </p>
      </div>
    </div>
  );
};

export default CpuLoad;
