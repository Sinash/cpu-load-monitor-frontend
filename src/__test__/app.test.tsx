import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import App from '../app'; // Adjust the import path to your App component
import { fetchCpuSummary } from '../services/cpuService';

// Mock the fetchCpuSummary function
jest.mock('../services/cpuService', () => ({
  fetchCpuSummary: jest.fn(),
}));

beforeAll(() => {
  // Mock getContext to prevent errors
  HTMLCanvasElement.prototype.getContext = jest.fn();
});

describe('App component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the App component with CPU Load Monitoring heading and child components', async () => {
    const mockCpuSummary = {
      currentLoad: {
        loadAverage: 0.5,
        isHighLoad: false,
        isRecovery: false,
        timestamp: '2024-09-23T12:00:00Z',
      },
      history: [
        { loadAverage: 0.5, timestamp: '2024-09-23T12:00:00Z' },
        { loadAverage: 0.3, timestamp: '2024-09-23T12:01:00Z' },
      ],
      alerts: {
        highLoadAlerts: [],
        recoveryAlerts: [],
      },
    };

    // Mock the API response for fetchCpuSummary
    (fetchCpuSummary as jest.Mock).mockResolvedValueOnce(mockCpuSummary);

    // Render the App component
    render(<App />);

    // Wait for the loading state to disappear and the heading to appear
    await waitFor(() => {
      expect(screen.getByText(/CPU Load Monitoring/i)).toBeInTheDocument();
    });

    // Optionally, you can check for child components as well
    expect(screen.getByText(/Current CPU Load/i)).toBeInTheDocument();
  });
});
