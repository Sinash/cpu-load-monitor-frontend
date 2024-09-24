import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import App from '../app'; // Adjust the import path as necessary

// Mock child components
jest.mock('../components/cpuLoad/index', () => () => (
  <div>Mocked CpuLoad Component</div>
));
jest.mock('../components/loadHistoryChart/index', () => () => (
  <div>Mocked LoadHistoryChart Component</div>
));
jest.mock('../components/alerts/index', () => () => (
  <div>Mocked Alerts Component</div>
));

describe('App component', () => {
  it('should render the App component with CPU Load Monitoring heading and child components', () => {
    // Render the App component
    render(<App />);

    // Check if the heading "CPU Load Monitoring" is present
    expect(screen.getByText(/CPU Load Monitoring/i)).toBeInTheDocument();

    // Check if the mocked CpuLoad component is rendered
    expect(screen.getByText(/Mocked CpuLoad Component/i)).toBeInTheDocument();

    // Check if the mocked LoadHistoryChart component is rendered
    expect(
      screen.getByText(/Mocked LoadHistoryChart Component/i)
    ).toBeInTheDocument();

    // Check if the mocked Alerts component is rendered
    expect(screen.getByText(/Mocked Alerts Component/i)).toBeInTheDocument();
  });
});
