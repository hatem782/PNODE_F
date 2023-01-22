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
    "0 0 1 1,7 *",
    () => {
      StudentController.NotifMailWorkUpdate();
    },
    {
      scheduled: false,
    }
  );
  task.start();
};

const Timer = () => {
  NotifMailUpdateWorkEvery6M();
};

module.exports = {
  Timer,
};
