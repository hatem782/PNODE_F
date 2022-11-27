const StudentModel = require("../models/student.module");

const CreateStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      birthDate,
      sex,
      profilImage,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !birthDate ||
      !sex ||
      !profilImage
    ) {
      return res
        .status(400)
        .json({ Message: "All informations are required", Success: false });
    }
    const existStudent = await StudentModel.findOne({ email });

    if (existStudent) {
      return res.status(409).json({
        Message: "student already exists with that mail",
        Success: false,
      });
    }
    const newStudent = await StudentModel.create({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      birthDate,
      sex,
      profilImage,
    });
    const createdStudent = await newStudent.save();

    return res.status(200).json({
      Message: "student created suucessfully",
      Success: true,
      data: createdStudent,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    return res.status(200).json({
      Message: "all students",
      Success: true,
      data: students,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetOneStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res
        .status(400)
        .json({ Message: "All informations are required!", Success: false });
    }
    const student = await StudentModel.findOne({ _id });
    return res.status(200).json({
      Message: "data successfully",
      Success: true,
      data: student,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
      sex,
      profilImage,
    } = req.body;
    if (
      !_id ||
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !birthDate ||
      !sex ||
      !profilImage
    ) {
      return res
        .status(400)
        .json({ Message: "All informations are required!", Success: false });
    }
    const updateStudent = await StudentModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          firstName,
          lastName,
          email,
          phoneNumber,
          birthDate,
          sex,
          profilImage,
        },
      },
      { new: true }
    );
    if (!updateStudent) {
      return res.status(400).json({
        Message: "Failed to update student",
        Success: false,
        data: updateStudent,
      });
    }
    return res.status(200).json({ Message: "Student updated successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const DeleteStudent = async (req, res) => {
  try {
    const { _id } = req.params;
    if (!_id) {
      return res.status(400).json({ Message: "student id is required!" });
    }
    const removeStudent = await StudentModel.deleteOne({ _id });
    if (!removeStudent) {
      return res.status(400).json({ Message: "Failed to delete student" });
    }
    return res.status(200).json({ Message: "student deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  CreateStudent,
  GetAllStudents,
  GetOneStudent,
  UpdateStudent,
  DeleteStudent,
};
