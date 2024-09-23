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

// Basic Auth credentials (ideally fetched from environment variables)
const username = process.env.REACT_APP_API_USERNAME;
const password = process.env.REACT_APP_API_PASSWORD;
const encodedCredentials = btoa(`${username}:${password}`);

// Axios instance with Basic Auth header
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Basic ${encodedCredentials}`,
    'Content-Type': 'application/json',
  },
});

// Fetch the current CPU load data
export const fetchCpuLoad = async (): Promise<CpuLoadResponse> => {
  const response = await axiosInstance.get<CpuLoadResponse>('/cpu-load');
  return response.data;
};

// Fetch the CPU load history
export const fetchLoadHistory = async (): Promise<LoadData[]> => {
  const response = await axiosInstance.get<LoadData[]>('/cpu-load-history');
  return response.data;
};

// Fetch the high load and recovery alerts
export const fetchAlerts = async (): Promise<AlertsResponse> => {
  const response = await axiosInstance.get<AlertsResponse>('/cpu-load-alerts');
  return response.data;
};
