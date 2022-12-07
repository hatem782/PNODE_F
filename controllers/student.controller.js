const StudentModel = require("../models/student.module");
const bcrypt = require("bcrypt");

const RegisterStudent = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      birthDate,
      sex,
      classe,
      niveau,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !birthDate ||
      !sex ||
      !classe ||
      !niveau
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

    // CRYPTING PASSWORD
    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const newStudent = await StudentModel.create({
      firstName,
      lastName,
      email,
      password: cryptedMdp,
      phoneNumber,
      birthDate,
      sex,
      classe,
      niveau,
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

const RegisterAluminie = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      birthDate,
      sex,
      promotion,
      deplome,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !phoneNumber ||
      !birthDate ||
      !sex ||
      !promotion ||
      !deplome
    ) {
      return res
        .status(400)
        .json({ Message: "All informations are required", Success: false });
    }
    const existStudent = await StudentModel.findOne({ email });

    if (existStudent) {
      return res.status(409).json({
        Message: "Aluminie already exists with that mail",
        Success: false,
      });
    }

    // CRYPTING PASSWORD
    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const newStudent = await StudentModel.create({
      firstName,
      lastName,
      email,
      password: cryptedMdp,
      phoneNumber,
      birthDate,
      sex,
      deplome,
      isAluminie: true,
      isDeplomated: true,
    });
    const createdStudent = await newStudent.save();

    return res.status(200).json({
      Message: "Aluminie created suucessfully",
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
    const { firstName, lastName, email, phoneNumber, birthDate, sex } =
      req.body;
    if (!_id || !firstName || !lastName || !phoneNumber || !birthDate || !sex) {
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
          phoneNumber,
          birthDate,
          sex,
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

const CreateStudent = async (req, res) => {};

const CreateAluminie = async (req, res) => {};

const StudentLogin = async (req, res) => {};

const AluminieLogin = async (req, res) => {};

const UploadCV = async (req, res) => {};

const UploadProfileImg = async (req, res) => {};

const ChangePassword = async (req, res) => {};

const ChangeEmail = async (req, res) => {}; // to test if the mail is unique or not

const UpdatePromotion = async (req, res) => {};

const UpdateDeplome = async (req, res) => {
  // make him aluminie
  // make deplomated true
  // update promotion
};

const Public_Private_Profile = async (req, res) => {};

module.exports = {
  RegisterStudent,
  GetAllStudents,
  GetOneStudent,
  UpdateStudent,
  DeleteStudent,
  RegisterAluminie,
};
