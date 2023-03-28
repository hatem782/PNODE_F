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

const GetAllTeacher = async (req, res) => {
  try {
    const teachers = await UserModel.find({
      role: "TEACHER",
    });

    return res.status(200).json({
      Message: "Teacher found succesfully",
      Success: true,
      data: teachers,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  UpdateTeacherCourse,
  UpdateTeacherToResp,
  GetAllTeacher,
};
