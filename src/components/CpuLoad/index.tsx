// src/components/CpuLoad.tsx

import React, { useEffect, useState } from 'react';
import { CpuLoadResponse, fetchCpuLoad } from '../../services/cpuService';

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

    // Polling every 10 seconds
    const interval = setInterval(getCpuLoadData, 10000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const formatTimestamp = (timestamp: string | undefined | null) => {
    if (!timestamp) return 'No timestamp available';
    const date = new Date(timestamp);
    return date.toLocaleString(); // Converts to a readable format
  };

  if (loading) return <div>Loading CPU Load...</div>;

  return (
    <div>
      <h2>Current CPU Load</h2>
      {cpuLoadData && (
        <div>
          <p>Load Average: {cpuLoadData.loadAverage}</p>
          <p>Status: {cpuLoadData.isHighLoad ? 'High Load' : 'Normal'}</p>
          <p>Timestamp: {formatTimestamp(cpuLoadData.timestamp)}</p>
        </div>
      )}
    </div>
  );
};

export default CpuLoad;
