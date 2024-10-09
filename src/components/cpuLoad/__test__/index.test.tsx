import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import React from 'react';
import CpuLoad from '../index'; // Adjust the import path to your CpuLoad component

describe('CpuLoad component', () => {
  it('should display CPU load data when passed as props', async () => {
    const mockCpuLoadData = {
      loadAverage: 1.5,
      isHighLoad: true,
      isRecovery: false, // Add this field
      timestamp: '2024-09-23T12:00:00Z',
    };

    // Render the component with mock data passed as props
    render(<CpuLoad currentLoad={mockCpuLoadData} />);

    // Wait for the data to be loaded and the component to be updated
    expect(screen.getByText(/Current CPU Load/i)).toBeInTheDocument();

    // Use `within` to target the specific container where the text is located
    const cpuLoadInfo = screen.getByText(/Current CPU Load/i).closest('div');
    const { getByText } = within(cpuLoadInfo as HTMLElement);

    // Check if the load average is displayed correctly using a flexible regex
    expect(getByText(/Load Average/i)).toBeInTheDocument();
    expect(getByText(/1\.5/)).toBeInTheDocument(); // Use regex to match '1.5' in the document

    // Check if the status is displayed correctly
    expect(getByText(/High Load/i)).toBeInTheDocument(); // High load status

    // Check if the timestamp is displayed correctly using regex for time formatting
    expect(getByText(/Timestamp/i)).toBeInTheDocument();
    expect(
      getByText(/9\/23\/2024, \d{1,2}:\d{2}:\d{2} [AP]M/)
    ).toBeInTheDocument(); // Match the timestamp flexibly
  });

  it('should display "Normal" status when load is not high', async () => {
    const mockCpuLoadData = {
      loadAverage: 0.7,
      isHighLoad: false,
      isRecovery: true, // Add this field
      timestamp: '2024-09-23T12:00:00Z',
    };

    // Render the component with mock data passed as props
    render(<CpuLoad currentLoad={mockCpuLoadData} />);

    expect(screen.getByText(/Current CPU Load/i)).toBeInTheDocument();

    // Use `within` to target the specific container where the text is located
    const cpuLoadInfo = screen.getByText(/Current CPU Load/i).closest('div');
    const { getByText } = within(cpuLoadInfo as HTMLElement);

    // Check if the load average is displayed correctly using regex
    expect(getByText(/Load Average/i)).toBeInTheDocument();
    expect(getByText(/0\.7/)).toBeInTheDocument(); // Use regex to match '0.7'

    // Check if the status is displayed correctly
    expect(getByText(/Normal/i)).toBeInTheDocument(); // Normal status

    // Check if the timestamp is displayed correctly using regex
    expect(getByText(/Timestamp/i)).toBeInTheDocument();
    expect(
      getByText(/9\/23\/2024, \d{1,2}:\d{2}:\d{2} [AP]M/)
    ).toBeInTheDocument(); // Match the timestamp flexibly
  });

  it('should handle missing CPU load data gracefully', async () => {
    const emptyCpuLoadData = {
      loadAverage: 0,
      isHighLoad: false,
      isRecovery: false,
      timestamp: '',
    };

    // Render the component with empty data
    render(<CpuLoad currentLoad={emptyCpuLoadData} />);

    // Ensure the component still renders the heading despite no data
    expect(screen.getByText(/Current CPU Load/i)).toBeInTheDocument();

    // Check that it gracefully handles the empty data
    expect(screen.queryByText(/Load Average/i)).toBeInTheDocument();
    expect(screen.queryByText(/0/)).toBeInTheDocument();
  });
});
