const UserModel = require("../models/user.module");

const UpdateAdminPermessions = async (req, res) => {
  try {
    const { _id } = req.params;

    const updatedAdmin = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updatedAdmin) {
      return res.status(400).json({
        Message: "Failed to update admin",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "admin updated successfully", data: updatedAdmin });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllAccounts = async (req, res) => {
  try {
    const admins = await UserModel.find({
      role: "ADMIN",
    });

    return res.status(200).json({
      Message: "All Accounts",
      Success: true,
      data: admins,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
module.exports = {
  UpdateAdminPermessions,
  GetAllAccounts,
};
