const UserModel = require("../models/user.module");
const bcrypt = require("bcrypt");
const GenereteToken = require("../functions/GenerateJWT");

const UpdateTeacherCourse = async (req, res) => {
  try {
    const { _id } = req.user;
    // course

    const updateTeacher = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true } // return new teacher with update
    );
    if (!updateTeacher) {
      return res.status(400).json({
        Message: "Failed to update teacher",
        Success: false,
        data: updateTeacher,
      });
    }
    return res
      .status(200)
      .json({ Message: "teacher updated successfully", data: updateTeacher });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateTeacherToResp = async (req, res) => {
  try {
    const { _id } = req.params;

    const teacher = await UserModel.findOne({ _id });

    if (!teacher) {
      return res.status(400).json({
        Message: "teacher not found",
        Success: false,
      });
    }

    const updateTeacher = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          isResponsable: !teacher.isResponsable,
        },
      },
      { new: true } // return new teacher with update
    );
    if (!updateTeacher) {
      return res.status(400).json({
        Message: "Failed to update teacher",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "teacher updated successfully", data: updateTeacher });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  UpdateTeacherCourse,
  UpdateTeacherToResp,
};
