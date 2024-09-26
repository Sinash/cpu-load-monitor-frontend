import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import LoadHistoryChart from '../index';

// Mock the Line component from react-chartjs-2 and capture its props
const mockLine = jest.fn();

jest.mock('react-chartjs-2', () => ({
  Line: (props: any) => {
    mockLine(props); // Capture the props passed to Line
    return <div>Mocked Line Chart</div>; // Return a dummy div
  },
}));

beforeAll(() => {
  // Mock getContext to prevent canvas errors
  HTMLCanvasElement.prototype.getContext = jest.fn();
});

describe('LoadHistoryChart component', () => {
  it('should display the chart with the provided load history and alerts', () => {
    const mockHistory = [
      {
        loadAverage: 0.3,
        timestamp: '2024-09-23T08:00:00Z',
      },
      {
        loadAverage: 0.5,
        timestamp: '2024-09-23T08:01:00Z',
      },
    ];

    const mockAlerts = {
      highLoadAlerts: [
        { startTime: '2024-09-23T08:00:00Z', endTime: '2024-09-23T08:01:00Z' },
      ],
      recoveryAlerts: [],
    };

    // Render the component and pass the mock data as props
    render(<LoadHistoryChart history={mockHistory} alerts={mockAlerts} />);

    // Extract the props passed to the Line component
    const lineProps = mockLine.mock.calls[0][0];

    // Focused assertions:
    expect(lineProps.data.labels).toEqual(['4:00:00 AM', '4:01:00 AM']);

    // Verify that the title of the chart is present in the DOM
    expect(screen.getByText('Mocked Line Chart')).toBeInTheDocument();
  });
});
