import '@testing-library/jest-dom';
import { act, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { fetchAlerts, fetchLoadHistory } from '../../../services/cpuService';
import LoadHistoryChart from '../index';

// Mock the service functions
jest.mock('../../../services/cpuService', () => ({
  fetchLoadHistory: jest.fn(),
  fetchAlerts: jest.fn(),
}));

// Mock the Line component from react-chartjs-2 and capture its props
const mockLine = jest.fn(); // Mock function to capture props

jest.mock('react-chartjs-2', () => ({
  Line: (props: any) => {
    mockLine(props); // Capture the props passed to Line
    return <div>Mocked Line Chart</div>; // Return a dummy div
  },
}));

describe('LoadHistoryChart', () => {
  const originalError = console.error;

  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
    console.error = originalError;
  });

  it('should handle errors from fetch functions gracefully', async () => {
    // Mock the fetch functions to throw an error
    (fetchLoadHistory as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );
    (fetchAlerts as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    );

    // Use act to wait for async updates
    await act(async () => {
      render(<LoadHistoryChart />);
    });

    // Log the mock calls to check if the mock functions are being called
    console.log(
      'fetchLoadHistory calls:',
      (fetchLoadHistory as jest.Mock).mock.calls
    );
    console.log('fetchAlerts calls:', (fetchAlerts as jest.Mock).mock.calls);

    // Ensure the error doesn't break rendering
    await waitFor(() => {
      // Check if fetchLoadHistory and fetchAlerts were called
      expect(fetchLoadHistory).toHaveBeenCalledTimes(1);
      expect(fetchAlerts).toHaveBeenCalledTimes(1);

      // The chart should not be rendered because the service calls failed
      expect(mockLine).not.toHaveBeenCalled(); // The chart should not render due to errors

      // Assert that the error message was logged
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching load history: ',
        expect.any(Error)
      );
      expect(console.error).toHaveBeenCalledWith(
        'Error fetching alerts: ',
        expect.any(Error)
      );
    });

    // Check that the loading message is no longer present after error handling
    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});
