// src/components/CpuLoad.tsx

import React, { useEffect, useState } from 'react';
import { CpuLoadResponse, fetchCpuLoad } from '../../services/cpuService';
import './scss/index.scss'; // Import the SCSS file for styling

const CpuLoad: React.FC = () => {
  const [cpuLoadData, setCpuLoadData] = useState<CpuLoadResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCpuLoadData = async () => {
      try {
        const data = await fetchCpuLoad();
        setCpuLoadData(data);
      } catch (error) {
        console.error('Failed to fetch CPU load', error);
      } finally {
        setLoading(false);
      }
    };

    getCpuLoadData();

    const interval = setInterval(getCpuLoadData, 10000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const formatTimestamp = (timestamp: string | undefined | null) => {
    if (!timestamp) return 'No timestamp available';
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) return <div>Loading CPU Load...</div>;

  return (
    <div className="cpu-load">
      <h2>Current CPU Load</h2>
      {cpuLoadData && (
        <div className="cpu-load-info">
          <p>
            <strong>Load Average:</strong> {cpuLoadData.loadAverage} |{' '}
            <strong>Status:</strong>{' '}
            <span
              className={cpuLoadData.isHighLoad ? 'high-load' : 'normal-load'}
            >
              {cpuLoadData.isHighLoad ? 'High Load' : 'Normal'}
            </span>{' '}
            | <strong>Timestamp:</strong>{' '}
            {formatTimestamp(cpuLoadData.timestamp)}
          </p>
        </div>
      )}
    </div>
  );
};

export default CpuLoad;
