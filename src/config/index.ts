// Importing the 'dotenv' package to load environment variables from a .env file into process.env
import dotenv from 'dotenv';
// Load environment variables from the .env file
dotenv.config();

// Exporting a config object that contains application configuration settings
export const config = {
  // Define the PORT for the server to run on, defaulting to 3000 if not set in the environment variables
  PORT: process.env.PORT || 3000,
};
