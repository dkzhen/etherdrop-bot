const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.dailyLogin = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const res = await axios.post(
        "https://api.miniapp.dropstab.com/api/bonus/dailyBonus",
        {},
        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );

      console.log(
        `[ SUCCESS ] : Daily login done. Result: ${res.data.result}. Bonus: ${res.data.bonus}. Streak: ${res.data.streaks}`
      );
    }
  } catch (error) {
    console.log("[ Error ] : daily login failed. Message : " + error.message);
  }
};
