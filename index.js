const cron = require("node-cron");
const express = require("express");

const { configDotenv } = require("dotenv");
const { validateToken } = require("./func/CheckValidToken");
const { getAuthToken } = require("./func/getAuthToken");
const { dailyLogin } = require("./func/dailyLogin");
const { dailyTask } = require("./func/dailyTask");
configDotenv();
// Schedule the task to run every hour on the hour
dailyLogin();
dailyTask();

cron.schedule("0 0 * * *", dailyLogin);
cron.schedule("0 0 * * *", dailyTask);

// Start the server
const port = process.env.PORT || 104;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
