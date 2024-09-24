import React from 'react';
import Alerts from './components/alerts/index';
import CpuLoad from './components/cpuLoad/index';
import LoadHistoryChart from './components/loadHistoryChart/index';

const App: React.FC = () => {
  return (
    <div>
      <h1>CPU Load Monitoring</h1>
      <CpuLoad />
      <LoadHistoryChart />
      <Alerts />
    </div>
  );
};

export default App;
