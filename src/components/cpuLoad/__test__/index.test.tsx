import '@testing-library/jest-dom';
import { act, render, screen, within } from '@testing-library/react';
import React from 'react';
import { fetchCpuLoad } from '../../../services/cpuService';
import CpuLoad from '../index'; // Adjust the import path to your CpuLoad component

jest.mock('../../../services/cpuService', () => ({
  fetchCpuLoad: jest.fn(),
}));

describe('CpuLoad component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Suppress console.error
    jest.useFakeTimers(); // Use fake timers for setInterval and setTimeout
  });

  afterEach(() => {
    jest.useRealTimers(); // Restore real timers after each test
    jest.restoreAllMocks(); // Restore the original console.error after each test
  });

  it('should display loading state initially', async () => {
    // Simulate delayed API response by not resolving the promise immediately
    (fetchCpuLoad as jest.Mock).mockImplementationOnce(
      () => new Promise((resolve) => setTimeout(() => resolve(null), 1000))
    );

    // Render the component
    await act(async () => {
      render(<CpuLoad />);
    });

    // Assert that the loading state is displayed initially
    expect(screen.getByText(/Loading CPU Load/i)).toBeInTheDocument();

    // Advance timers to simulate data fetching completion
    act(() => {
      jest.advanceTimersByTime(1000);
    });
  });

  it('should display CPU load data when fetched', async () => {
    const mockCpuLoadData = {
      loadAverage: 1.5,
      isHighLoad: true,
      timestamp: '2024-09-23T12:00:00Z',
    };

    // Mock the API response
    (fetchCpuLoad as jest.Mock).mockResolvedValueOnce(mockCpuLoadData);

    await act(async () => {
      render(<CpuLoad />);
    });

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
      timestamp: '2024-09-23T12:00:00Z',
    };

    (fetchCpuLoad as jest.Mock).mockResolvedValueOnce(mockCpuLoadData);

    await act(async () => {
      render(<CpuLoad />);
    });

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

  it('should handle errors when fetching CPU load fails', async () => {
    (fetchCpuLoad as jest.Mock).mockRejectedValueOnce(
      new Error('Failed to fetch CPU load')
    );

    await act(async () => {
      render(<CpuLoad />);
    });

    // Wait for loading to finish
    expect(screen.queryByText(/Loading CPU Load/i)).not.toBeInTheDocument();

    // Ensure the component still renders the heading despite the error
    expect(screen.getByText(/Current CPU Load/i)).toBeInTheDocument();
  });
});
