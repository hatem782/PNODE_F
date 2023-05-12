const UserModel = require("../models/user.module");
async function autoUpdateEveryYear() {
  try {
    const updateStudent = await UserModel.updateMany(
      { $or: [{ role: "STUDENT" }, { role: "ALUMINIE" }] },
      { $set: { isUpdated: false } }
    );
    console.log("Students  updated successfully");
  } catch (error) {
    console.log("Error updating students", error);
  }
}
module.exports = {
  autoUpdateEveryYear,
};
