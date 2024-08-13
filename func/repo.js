const { default: axios } = require("axios");

exports.claimFarming = async (token) => {
  const CLAIM_FARMING_API =
    "https://game-domain.blum.codes/api/v1/farming/claim";

  try {
    const claim = await axios.post(
      CLAIM_FARMING_API,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return claim.status;
  } catch (error) {
    throw error.response.status;
  }
};

exports.startFarming = async (token) => {
  try {
    const start = await axios.post(
      "https://game-domain.blum.codes/api/v1/farming/start",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return start.data;
  } catch (error) {
    throw error.response.status;
  }
};
