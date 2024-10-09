const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.dailyTask = async () => {
  try {
    const tokens = await validateToken();

    for (const token of tokens) {
      const res = await axios.get(
        "https://api.miniapp.dropstab.com/api/quest",

        {
          headers: {
            Authorization: `Bearer ${token.token}`,
          },
        }
      );
      const quests = res.data;

      const dailyQuestFilter = quests.filter((q) => q.name === "Daily");
      const socialQuestFilter = quests.filter((q) => q.name === "Social");
      const dailyQuest = dailyQuestFilter.flatMap((q) =>
        q.quests.filter((q) => q.status !== "COMPLETED")
      );
      const socialQuest = socialQuestFilter.flatMap((q) =>
        q.quests.filter((q) => q.status != "COMPLETED")
      );

      if (dailyQuest.length > 0) {
        for (const quest of dailyQuest) {
          const verify = await axios.put(
            `https://api.miniapp.dropstab.com/api/quest/${quest.id}/verify`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token.token}`,
              },
            }
          );
          console.log(
            `[ SUCCESS ] : Daily task Verify done. Status: ${verify.data.status}`
          );
          const claim = await axios.put(
            `https://api.miniapp.dropstab.com/api/quest/${quest.id}/claim`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token.token}`,
              },
            }
          );
          console.log(
            `[ SUCCESS ] : Daily Claim done. Status: ${claim.data.status}`
          );
        }
      } else {
        console.log(`[ DONE ] : All daily task failed. Quest not found.`);
      }

      if (socialQuest.length > 0) {
        for (const quest of socialQuest) {
          const verify = await axios.put(
            `https://api.miniapp.dropstab.com/api/quest/${quest.id}/verify`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token.token}`,
              },
            }
          );
          console.log(
            `[ SUCCESS ] : Social task done. Status: ${verify.data.status}`
          );
        }
      } else {
        console.log(`[ DONE ] : All social task completed. Quest not found.`);
      }
    }
  } catch (error) {
    console.log(error);
    console.log(`[ Error ] : daily task failed. Message : ${error.message}`);
  }
};
