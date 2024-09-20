// Importing Request and Response types from Express to define the request and response objects
import { Request, Response } from 'express';
// Importing the CPU service, which handles business logic related to CPU alerts
import cpuService from '../services/cpuService';
// Importing the logger utility for logging messages
import { logger } from '../utils/logger';

/**
 * Controller function to handle the GET request for retrieving CPU alerts.
 *
 * @param {Request} req - The Express request object
 * @param {Response} res - The Express response object
 *
 * @returns {void} Sends a JSON response containing the CPU alerts or an error message
 */
export const getCpuAlerts = (req: Request, res: Response) => {
  try {
    // Call the cpuService to retrieve CPU alerts
    const data = cpuService.getAlerts();

    // Respond with the data in JSON format
    res.json(data);
  } catch (error) {
    // Check if the error is an instance of Error
    if (error instanceof Error) {
      // Log the error message using the logger utility
      logger(`Error retrieving CPU alerts: ${error.message}`);
    } else {
      // Log a generic error message if the error is not an instance of Error
      logger('An unknown error occurred while retrieving CPU alerts.');
    }

    // If an error occurs, respond with a 500 status code and an error message
    res.status(500).json({ error: 'Failed to get CPU alerts' });
  }
};
