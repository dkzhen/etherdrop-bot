const { default: axios } = require("axios");
const { validateToken } = require("./CheckValidToken");

exports.mission = async () => {
  try {
    const token = await validateToken();

    for (const t of token) {
      const task = await axios.get(
        "https://earn-domain.blum.codes/api/v1/tasks",
        {
          headers: {
            Authorization: `Bearer ${t.token}`,
          },
        }
      );

      const allTasks = task.data[1].subSections;
      const tasks = allTasks.flatMap((item) => item.tasks);
      const taskNotStarted = tasks.filter(
        (item) =>
          item.status === "NOT_STARTED" && item.type !== "PROGRESS_TARGET"
      );

      for (const i of taskNotStarted) {
        if (taskNotStarted.length > 0) {
          try {
            await axios.post(
              `https://earn-domain.blum.codes/api/v1/tasks/${i.id}/start`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${t.token}`,
                },
              }
            );
            console.log(
              `[ Running ] : Claim ${i.title} successfully. Reward ${i.reward}`
            );
          } catch (error) {
            console.log(error.message);
          }
        } else {
          console.log(`[ Completed ] : No task not started.`);
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.claimMission = async () => {
  try {
    const token = await validateToken();

    for (const t of token) {
      const task = await axios.get(
        "https://earn-domain.blum.codes/api/v1/tasks",
        {
          headers: {
            Authorization: `Bearer ${t.token}`,
          },
        }
      );
      const allTasks = task.data[1].subSections;
      const tasks = allTasks.flatMap((item) => item.tasks);
      const taskReadyToClaim = tasks.filter(
        (item) =>
          item.status === "READY_FOR_CLAIM" && item.type !== "PROGRESS_TARGET"
      );

      for (const i of tasks) {
        if (taskReadyToClaim.length > 0) {
          try {
            await axios.post(
              `https://earn-domain.blum.codes/api/v1/tasks/${i.id}/claim`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${t.token}`,
                },
              }
            );
            console.log(
              `[ Running ] : Claim ${i.title} successfully. Reward ${i.reward}`
            );
          } catch (error) {
            console.log(`[ Error ] : Claim mission failed. ${error.message}`);
          }
        } else {
          console.log(`[ Completed ] : No task ready to claim.`);
        }
      }
    }
  } catch (error) {
    console.log(`[ Error ] : Claim mission failed. ${error.message}`);
  }
};
