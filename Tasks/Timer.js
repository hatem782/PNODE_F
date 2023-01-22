var cron = require("node-cron");
const StudentController = require("../controllers/student.controller");

// # ┌──────────── minute
// # │ ┌────────── hour
// # │ │ ┌──────── day of month
// # │ │ │ ┌────── month
// # │ │ │ │ ┌──── day of week
// # │ │ │ │ │
// # │ │ │ │ │
// # * * * * *

const NotifMailUpdateWorkEvery6M = () => {
  // at 00:00 in day N°1 of months 1 and 7
  var task = cron.schedule(
    "0 0 1 1,7 *", // "0-59 * * * * *"
    async () => {
      await StudentController.NotifMailWorkUpdate();
    },
    {
      scheduled: false,
    }
  );
  task.start();
};

const NotifMailUpdateCompAndProf = () => {
  // at 00:00 in day N°16 of months 1 => end of semestre 1
  var task1 = cron.schedule("0 0 16 1 *", () => {
    StudentController.NotifMailUpdateCompAndProf();
  });
  var task2 = cron.schedule(
    // at 00:00 in day N°31 of months 7 => end of semestre 2
    "0 0 31 7 *",
    () => {
      StudentController.NotifMailUpdateCompAndProf();
    }
  );
  task1.start();
  task2.start();
};

const VerifObtDateDip = () => {
  // at 00:00 in day N°15 of months 10 => send mail to verif the obt of diplome
  var task = cron.schedule("0 0 15 10 *", () => {
    StudentController.VerifObtDateDip();
  });
  task.start();
};

const Timer = () => {
  NotifMailUpdateWorkEvery6M();
  NotifMailUpdateCompAndProf();
  VerifObtDateDip();
};

module.exports = {
  Timer,
};
