const StudentModel = require("../models/student.module");
const bcrypt = require("bcrypt");
const Mailer = require("../mails/Mail_Sender");
const GeneratePassword = require("../functions/GeneratePass");
const FileUpload = require("../uploads/FileUpload");

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

const ForgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ Message: "email is required", Success: false });
    }
    const existStudent = await StudentModel.findOne({ email });

    if (!existStudent) {
      return res.status(400).json({
        Message: "there's no student with that mail",
        Success: false,
      });
    }

    const password = GeneratePassword.GeneratePass();
    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const updateStudent = await StudentModel.findOneAndUpdate(
      { _id: existStudent._id },
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

    // SENDING THE LOGIN AND PASSWORD TO USER WITH MAIL
    let subject = "Password Recover";
    let content = `
          <div>
          <h2>Welcome ${existStudent.firstName} ${existStudent.lastName} to our plateforme</h2>
          <p>we recieved a request to recover your password</p>
          <p>your new password is : <b>${password}</b> </p>
          <p>please make sure to change your password after you access to your account</p>
          </div>`;
    await Mailer.Mail_Sender(existStudent.email, content, subject);

    return res
      .status(200)
      .json({ Message: "new password sent to your mail box" });
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

module.exports = {
  UploadProfileImg,
  ChangePassword,
  ChangeEmail,
  ForgotPassword,
};
