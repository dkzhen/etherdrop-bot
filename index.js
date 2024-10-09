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
// playGame();
// claimMission();
// claimRewards();
// mission();
// cron.schedule("0 * * * *", playGame);
// cron.schedule("0 * * * *", claimMission);
// cron.schedule("0 * * * *", claimRewards);
// cron.schedule("0 * * * *", mission);

// cron.schedule("0 0 * * *", DailyRewards);

// Start the server
const port = process.env.PORT || 104;
const app = express();

app.get("/", (req, res) => {
  res.send("API cron job server is running");
});

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
});
