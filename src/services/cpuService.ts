// services/cpuService.ts

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

export interface CpuSummaryResponse {
  currentLoad: CpuLoadResponse;
  history: LoadData[];
  alerts: AlertsResponse;
}

const BASE_URL = config.BACKEND_URL;

// Basic Auth credentials (ideally fetched from environment variables)
const username = process.env.REACT_APP_API_USERNAME;
const password = process.env.REACT_APP_API_PASSWORD;
const encodedCredentials = btoa(`${username}:${password}`);

// Axios instance with Basic Auth header
export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Basic ${encodedCredentials}`,
    'Content-Type': 'application/json',
  },
});

// Fetch the CPU summary from the API
export const fetchCpuSummary = async (): Promise<CpuSummaryResponse> => {
  const response = await axiosInstance.get<CpuSummaryResponse>('/cpu-summary');
  return response.data;
};
