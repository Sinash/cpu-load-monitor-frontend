import React from 'react';
import Alerts from './components/Alerts/index';
import CpuLoad from './components/CpuLoad/index';
import LoadHistoryChart from './components/LoadHistoryChart/index';

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
