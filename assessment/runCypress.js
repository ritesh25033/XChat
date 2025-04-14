const cypress = require("cypress");
const fs = require("fs");
require("dotenv").config();

console.log("Frontend URL:", process.env.FRONTEND_URL);
console.log("Backend URL:", process.env.BACKEND_URL);

// Run Cypress tests with the updated configuration
cypress
  .run({
    config: {
      e2e: {
        env: {
          frontendUrl: process.env.FRONTEND_URL,
          backendUrl: process.env.BACKEND_URL,
        },
      },
    },
  })
  .then((results) => {
    fs.writeFileSync("cypressResults.json", JSON.stringify(results, null, 2));
  })
  .catch((err) => {
    console.error(err);
  });
