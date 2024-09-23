import {
  AlertsResponse,
  axiosInstance,
  CpuLoadResponse,
  fetchAlerts,
  fetchCpuLoad,
  fetchLoadHistory,
  LoadData,
} from '../cpuService';

// Use jest.spyOn to mock axiosInstance.get
describe('cpuServices', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  describe('fetchCpuLoad', () => {
    it('should fetch the current CPU load data successfully', async () => {
      // Mock the response data
      const mockCpuLoadResponse: CpuLoadResponse = {
        loadAverage: 1.5,
        isHighLoad: true,
        isRecovery: false,
        timestamp: '2024-09-23T12:00:00Z',
      };

      // Spy on axiosInstance.get and mock its implementation
      jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
        data: mockCpuLoadResponse,
      });

      // Call the service function
      const data = await fetchCpuLoad();

      // Expect the data to match the mock response
      expect(data).toEqual(mockCpuLoadResponse);
      expect(axiosInstance.get).toHaveBeenCalledWith('/cpu-load');
    });

    it('should handle errors when fetching CPU load data', async () => {
      // Spy on axiosInstance.get and mock its implementation to throw an error
      jest
        .spyOn(axiosInstance, 'get')
        .mockRejectedValueOnce(new Error('Network error'));

      try {
        await fetchCpuLoad();
      } catch (error) {
        expect(error).toEqual(new Error('Network error'));
      }

      expect(axiosInstance.get).toHaveBeenCalledWith('/cpu-load');
    });
  });

  describe('fetchLoadHistory', () => {
    it('should fetch the CPU load history successfully', async () => {
      // Mock the response data
      const mockLoadHistory: LoadData[] = [
        { loadAverage: 1.5, timestamp: '2024-09-23T12:00:00Z' },
        { loadAverage: 0.9, timestamp: '2024-09-23T12:01:00Z' },
      ];

      // Spy on axiosInstance.get and mock its implementation
      jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
        data: mockLoadHistory,
      });

      // Call the service function
      const data = await fetchLoadHistory();

      // Expect the data to match the mock response
      expect(data).toEqual(mockLoadHistory);
      expect(axiosInstance.get).toHaveBeenCalledWith('/cpu-load-history');
    });

    it('should handle errors when fetching CPU load history', async () => {
      // Spy on axiosInstance.get and mock its implementation to throw an error
      jest
        .spyOn(axiosInstance, 'get')
        .mockRejectedValueOnce(new Error('Network error'));

      try {
        await fetchLoadHistory();
      } catch (error) {
        expect(error).toEqual(new Error('Network error'));
      }

      expect(axiosInstance.get).toHaveBeenCalledWith('/cpu-load-history');
    });
  });

  describe('fetchAlerts', () => {
    it('should fetch the alerts data successfully', async () => {
      // Mock the response data
      const mockAlertsResponse: AlertsResponse = {
        highLoadAlerts: [
          {
            startTime: '2024-09-23T12:00:00Z',
            endTime: '2024-09-23T12:02:00Z',
          },
        ],
        recoveryAlerts: [
          {
            startTime: '2024-09-23T12:05:00Z',
            endTime: '2024-09-23T12:07:00Z',
          },
        ],
      };

      // Spy on axiosInstance.get and mock its implementation
      jest.spyOn(axiosInstance, 'get').mockResolvedValueOnce({
        data: mockAlertsResponse,
      });

      // Call the service function
      const data = await fetchAlerts();

      // Expect the data to match the mock response
      expect(data).toEqual(mockAlertsResponse);
      expect(axiosInstance.get).toHaveBeenCalledWith('/cpu-load-alerts');
    });

    it('should handle errors when fetching alerts data', async () => {
      // Spy on axiosInstance.get and mock its implementation to throw an error
      jest
        .spyOn(axiosInstance, 'get')
        .mockRejectedValueOnce(new Error('Network error'));

      try {
        await fetchAlerts();
      } catch (error) {
        expect(error).toEqual(new Error('Network error'));
      }

      expect(axiosInstance.get).toHaveBeenCalledWith('/cpu-load-alerts');
    });
  });
});
