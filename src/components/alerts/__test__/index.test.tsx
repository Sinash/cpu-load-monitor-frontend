import '@testing-library/jest-dom';
import { render, screen, within } from '@testing-library/react';
import React from 'react';
import Alerts from '../index'; // Path to your Alerts component

describe('Alerts component', () => {
  it('should display high load and recovery alerts', async () => {
    const mockAlerts = {
      highLoadAlerts: [
        { startTime: '2024-09-23T12:00:00Z', endTime: '2024-09-23T12:01:00Z' },
      ],
      recoveryAlerts: [
        { startTime: '2024-09-23T12:05:00Z', endTime: '2024-09-23T12:07:00Z' },
      ],
    };

    // Render the component and pass the mockAlerts as a prop
    render(<Alerts alerts={mockAlerts} />);

    // Wait for the component to render the alerts
    expect(screen.getByText('High Load Alerts')).toBeInTheDocument();
    expect(screen.getByText('Recovery Alerts')).toBeInTheDocument();

    // Assert high load alerts
    const highAlertsContainer =
      screen.getByText('High Load Alerts').parentElement;
    expect(highAlertsContainer).toBeInTheDocument();

    // Use a regular expression to match the full date and time pattern
    const highAlertStart = within(highAlertsContainer!).getByText(
      /Start: 9\/23\/2024, \d{1,2}:\d{2}:\d{2} [AP]M/
    );
    const highAlertEnd = within(highAlertsContainer!).getByText(
      /End: 9\/23\/2024, \d{1,2}:\d{2}:\d{2} [AP]M/
    );
    expect(highAlertStart).toBeInTheDocument();
    expect(highAlertEnd).toBeInTheDocument();

    // Assert recovery alerts
    const recoveryAlertsContainer =
      screen.getByText('Recovery Alerts').parentElement;
    expect(recoveryAlertsContainer).toBeInTheDocument();

    const recoveryAlertStart = within(recoveryAlertsContainer!).getByText(
      /Start: 9\/23\/2024, \d{1,2}:\d{2}:\d{2} [AP]M/
    );
    const recoveryAlertEnd = within(recoveryAlertsContainer!).getByText(
      /End: 9\/23\/2024, \d{1,2}:\d{2}:\d{2} [AP]M/
    );
    expect(recoveryAlertStart).toBeInTheDocument();
    expect(recoveryAlertEnd).toBeInTheDocument();
  });
});
