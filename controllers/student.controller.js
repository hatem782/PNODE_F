const StudentModel = require("../models/student.module");
const bcrypt = require("bcrypt");
const GenereteToken = require("../functions/GenerateJWT");
const Mailer = require("../mails/Mail_Sender");
const GeneratePassword = require("../functions/GeneratePass");
const FileUpload = require("../uploads/FileUpload");

const CreateStudent = async (req, res) => {
  // auto generate password
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      birthDate,
      sex,
      classe,
      niveau,
      numero_classe,
      promotion,
    } = req.body;
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !birthDate ||
      !sex ||
      !classe ||
      !niveau ||
      !numero_classe ||
      !promotion
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

    // GENERATING PASSWORD
    let genPass = GeneratePassword.GeneratePass();

    // CRYPTING PASSWORD
    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(genPass, Number(salt));

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
      numero_classe,
      promotion,
    });
    const createdStudent = await newStudent.save();

    // SENDING THE LOGIN AND PASSWORD TO USER WITH MAIL
    let subject = "Isamm PFA/PFE";
    let content = `
    <div>
    <h2>Welcome ${firstName} ${lastName} to our plateforme</h2>
    <p>here you will find the informations about new account</p>
    <p>your login is : <b>${email}</b> </p>
    <p>your M-D-P is : <b>${genPass}</b> </p>
    <p>please make sure to change your password after you access to your account</p>
    </div>`;
    await Mailer.Mail_Sender(email, content, subject);

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
    const { _id } = req.user;
    const { firstName, lastName, phoneNumber, birthDate, sex } = req.body;
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

const StudentLogin = async (req, res) => {
  try {
    const { email, password } = req.query;
    //--------------------------------------------------------------------------
    // Verify all data exist
    if (!email || !password) {
      return res
        .status(406)
        .json({ Message: "All informations are required!", Success: false });
    }
    //--------------------------------------------------------------------------
    // Verify user by mail
    let user = await StudentModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        Message: "Please verify your email and password",
        Success: false,
      });
    }
    //--------------------------------------------------------------------------
    // Verify user password
    const passMatch = await bcrypt.compare(password, user?.password);
    if (!passMatch) {
      return res.status(400).json({
        Message: "Please verify your email and password",
        Success: false,
      });
    }
    const token = GenereteToken({ _id: user._id }, "24h");
    const role = user.isAluminie ? "aluminie" : "student";
    return res.status(200).json({
      Message: "Logged successfully",
      Success: true,
      data: { user, token, role },
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

    const updateStudent = await StudentModel.findOneAndUpdate(
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

const UploadProfileImg = async (req, res) => {
  try {
    const _id = req.user._id;
    const file = req.files.file;
    const imageData = await FileUpload.FileUpload(file, "students/images");

    const updateStudent = await StudentModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          profilImage: imageData.url,
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

const ChangePassword = async (req, res) => {
  try {
    const _id = req.user._id;
    const password = req.body.password;
    const oldpassword = req.body.oldpassword;
    const confpassword = req.body.confpassword;

    const passMatch = await bcrypt.compare(oldpassword, req.user.password);
    if (!passMatch) {
      return res.status(400).json({
        Message: "old password is not correct",
        Success: false,
      });
    }

    if (password !== confpassword) {
      return res
        .status(400)
        .json({ Message: "Confirm your Password", Success: false });
    }

    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const updateStudent = await StudentModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          password: cryptedMdp,
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

const ChangeEmail = async (req, res) => {
  try {
    const _id = req.user._id;
    const email = req.body.email;

    if (!email) {
      return res
        .status(406)
        .json({ Message: "email field is emtpy", Success: false });
    }

    const existStudent = await StudentModel.findOne({ email });

    if (existStudent) {
      return res.status(409).json({
        Message: "student already exists with that mail",
        Success: false,
      });
    }

    const updateStudent = await StudentModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          email: email,
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
    const { classe, niveau, numero_classe, promotion } = req.body;

    if (!promotion || !_id) {
      return res
        .status(406)
        .json({ Message: "promotion field is required", Success: false });
    }

    const updateStudent = await StudentModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          classe,
          niveau,
          numero_classe,
          promotion,
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

const BecomeDeplomated = async (req, res) => {
  try {
    const { _id } = req.params;
    const { promotion, deplome } = req.body;

    if (!deplome || !promotion || !_id) {
      return res
        .status(406)
        .json({ Message: "all fields are required", Success: false });
    }

    const updateStudent = await StudentModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          deplome,
          promotion,
          isDeplomated: true,
          isAluminie: true,
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

const pub_priv_profile = async (req, res) => {
  try {
    const { _id, isPublic } = req.user;

    if (!_id) {
      return res
        .status(406)
        .json({ Message: "id is required", Success: false });
    }

    const updateStudent = await StudentModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          isPublic: !isPublic,
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

const block_unblock = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      return res
        .status(406)
        .json({ Message: "id is required", Success: false });
    }

    const student = await StudentModel.findOne({ _id });

    const updateStudent = await StudentModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          blocked: !student.blocked,
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
  CreateStudent,
  GetAllStudents,
  GetOneStudent,
  UpdateStudent,
  DeleteStudent,
  RegisterAluminie,
  StudentLogin,
  UploadProfileImg,
  UploadCV,
  ChangePassword,
  ChangeEmail,
  UpdatePromotion,
  BecomeDeplomated,
  pub_priv_profile,
  block_unblock,
};
