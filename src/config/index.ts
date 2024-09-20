// Exporting a config object that contains application configuration settings
export const config = {
  // Define the PORT for the server to run on, defaulting to 3000 if not set in the environment variables
  PORT: process.env.PORT || 3000,

  // Define the BACKEND_URL
  BACKEND_URL: process.env.BACKEND_URL,
};
