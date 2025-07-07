const app = require('./src/app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGODB_URI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp';

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB');

    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📍 Health check: http://localhost:${PORT}/health`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  });

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Promise Rejection:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
// This code initializes an Express server, connects to a MongoDB database, and sets up error handling for unhandled promise rejections and uncaught exceptions. It logs the status of the server and database connection to the console, providing a clear indication of the application's state during startup. The server listens on a specified port, ready to handle incoming requests.
// This code initializes an Express server, connects to a MongoDB database, and sets up error handling for unhandled promise rejections and uncaught exceptions. It logs the status of the server and database connection to the console, providing a clear indication of the application's state during startup. The server listens on a specified port, ready to handle incoming requests.
