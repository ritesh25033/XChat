
const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.FRONTEND_URL || "http://localhost:5173", // Default to frontend URL
    setupNodeEvents(on, config) {
      // Add the URLs to the config
      config.env = config.env || {};
      config.env.frontendUrl = process.env.FRONTEND_URL;
      config.env.backendUrl = process.env.BACKEND_URL;

      // Return the updated config
      return config;
    },
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    viewportWidth: 1280,
    viewportHeight: 800,
    chromeWebSecurity: false,
    retries: {
      runMode: 2,
      openMode: 0,
    },
    video: true,
  },
});
