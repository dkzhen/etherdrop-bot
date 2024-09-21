const { default: axios } = require("axios");
const { configDotenv } = require("dotenv");
const { getAuthToken } = require("./getAuthToken");
const e = require("express");
configDotenv();

exports.validateToken = async () => {
  const API_URL = "https://earn-domain.blum.codes/api/v1/tasks";
  const tokens = await getAuthToken();

  const validToken = [];
  for (const token of tokens) {
    try {
      await axios.get(API_URL, {
        headers: {
          Authorization: `Bearer ${token.token}`,
        },
      });

      console.log(`[ BOT ] : Checking token done..`);
      validToken.push(token);
    } catch (error) {
      console.log(error);
      console.log(error.response.status);
      console.log(`[ Error ] : validate token failed`);
    }
  }
  return validToken;
};
