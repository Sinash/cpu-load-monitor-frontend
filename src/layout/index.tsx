// components/layout/index.tsx

import React, { useEffect, useState } from 'react';
import Alerts from '../components/alerts/index';
import CpuLoad from '../components/cpuLoad/index';
import LoadHistoryChart from '../components/loadHistoryChart/index';
import '../scss/index.scss'; // Import layout-specific styles
import { CpuSummaryResponse, fetchCpuSummary } from '../services/cpuService';

const Layout: React.FC = () => {
  const [cpuSummary, setCpuSummary] = useState<CpuSummaryResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getCpuSummary = async () => {
      try {
        const data = await fetchCpuSummary();
        setCpuSummary(data);
      } catch (error) {
        console.error('Failed to fetch CPU summary', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getCpuSummary();

    // Polling every 10 seconds
    const interval = setInterval(getCpuSummary, 10000);

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  if (loading) return <div>Loading CPU Summary...</div>;
  if (error || !cpuSummary) return <div>Failed to load CPU summary</div>;

  return (
    <div className="layout">
      <h1>CPU Load Monitoring Dashboard</h1>
      <CpuLoad currentLoad={cpuSummary.currentLoad} />
      <LoadHistoryChart
        history={cpuSummary.history}
        alerts={cpuSummary.alerts}
      />
      <Alerts alerts={cpuSummary.alerts} />
    </div>
  );
};

export default Layout;
