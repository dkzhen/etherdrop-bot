const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");
const { claimFarming, startFarming } = require("./repo");

const checkAvailableClaim = async (token) => {
  const CLAIM_FARMING_API =
    "https://game-domain.blum.codes/api/v1/user/balance";

  const now = new Date();

  try {
    const response = await axios.get(CLAIM_FARMING_API, {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    });

    let status;
    if (response.data.farming === undefined) {
      status = true;
    } else {
      status = now > response.data.farming.endTime;
    }

    return status;
  } catch (error) {
    console.error("Error checking claim:", error);
    return false;
  }
};
exports.claimRewards = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      try {
        const available = await checkAvailableClaim(token);

        if (available) {
          try {
            try {
              const claim = await claimFarming(token.token);
              console.log(
                `[ Running ] : Farming rewards successfully claimed. ${claim.data}`
              );
            } catch (error) {
              if (error === 412) {
                const start = await startFarming(token.token);
                console.log(
                  `[ Running ] : Farming started.. earnings rate : ${start.earningsRate}`
                );
              } else {
                console.log(`[ Error ] : Claim farming failed. ${error}`);
              }
            }
          } catch (error) {
            if (error.response.status === 425) {
              console.log(`[ BOT ] : It's too early to claim`);
            }
            console.log(`[ Error ] : Claim farming failed. ${error}`);
          }
        } else {
          console.log(`[ Completed ] : No need claim farming.`);
        }
      } catch (error) {
        console.log(`[ Error ] : error from claim farming. ${error.message}`);
      }
    }
  } catch (error) {
    console.log(`[ Error ] : error from claim rewards. ${error.message}`);
  }
};
