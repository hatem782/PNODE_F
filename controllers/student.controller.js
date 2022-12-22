const UserModel = require("../models/user.module");
const bcrypt = require("bcrypt");
const FileUpload = require("../uploads/FileUpload");

const RegisterAluminie = async (req, res) => {
  try {
    const { phoneNumber, email, password } = req.body;

    const existStudent = await UserModel.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (existStudent) {
      return res.status(409).json({
        Message: "Aluminie already exists with that email",
        Success: false,
      });
    }

    // CRYPTING PASSWORD
    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const newStudent = await UserModel.create({
      ...req.body,
      password: cryptedMdp,
      userName: phoneNumber,
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

const UploadCV = async (req, res) => {
  try {
    const _id = req.user._id;
    const file = req.files.file;
    const pdfData = await FileUpload.FileUpload(file, "students/cv");
    console.log(pdfData);

    const updateStudent = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          cv: pdfData.url,
        },
      },
      { new: true }
    );
    if (!updateStudent) {
      return res.status(400).json({
        Message: "Failed to update student",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Student updated successfully", data: updateStudent });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdatePromotion = async (req, res) => {
  try {
    const { _id } = req.params;
    // { classe, niveau, numero_classe, promotion }

    const updateStudent = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: req.body,
      },
      { new: true }
    );
    if (!updateStudent) {
      return res.status(400).json({
        Message: "Failed to update student",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Student updated successfully", data: updateStudent });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const BecomeDeplomated = async (req, res) => {
  try {
    const { _id } = req.params;
    // { promotion, deplome }

    const updateStudent = await UserModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          ...req.body,
          role: "ALUMINIE",
          classe: "",
          niveau: "",
          numero_classe: "",
        },
      },
      { new: true }
    );
    if (!updateStudent) {
      return res.status(400).json({
        Message: "Failed to update student",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "Student updated successfully", data: updateStudent });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  RegisterAluminie,
  UploadCV,
  UpdatePromotion,
  BecomeDeplomated,
};
