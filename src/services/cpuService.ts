// src/services/cpuService.ts

import axios from 'axios';
import { config } from '../config';

export interface LoadData {
  loadAverage: number;
  timestamp: string;
}

export interface CpuLoadResponse {
  loadAverage: number;
  isHighLoad: boolean;
  isRecovery: boolean;
  timestamp: string;
}

export interface Alert {
  startTime: string;
  endTime?: string;
}

export interface AlertsResponse {
  highLoadAlerts: Alert[];
  recoveryAlerts: Alert[];
}

const BASE_URL = config.BACKEND_URL;

// Fetch the current CPU load data
export const fetchCpuLoad = async (): Promise<CpuLoadResponse> => {
  const response = await axios.get<CpuLoadResponse>(`${BASE_URL}/cpu-load`);
  return response.data;
};

// Fetch the CPU load history
export const fetchLoadHistory = async (): Promise<LoadData[]> => {
  const response = await axios.get<LoadData[]>(`${BASE_URL}/cpu-load-history`);
  return response.data;
};

// Fetch the high load and recovery alerts
export const fetchAlerts = async (): Promise<AlertsResponse> => {
  const response = await axios.get<AlertsResponse>(
    `${BASE_URL}/cpu-load-alerts`
  );
  return response.data;
};
