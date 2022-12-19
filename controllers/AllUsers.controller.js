const StudentModel = require("../models/student.module");
const TeachertModel = require("../models/teacher.model");
const bcrypt = require("bcrypt");
const Mailer = require("../mails/Mail_Sender");
const GeneratePassword = require("../functions/GeneratePass");
const FileUpload = require("../uploads/FileUpload");

const GetUserSchema = (userType) => {
  switch (userType) {
    case "students":
      return StudentModel;
    case "teachers":
      return TeachertModel;
    default:
      return StudentModel;
  }
};

const UploadProfileImg = async (req, res) => {
  try {
    const _id = req.user._id;
    const file = req.files.file;
    const userType = req.userType;
    const imageData = await FileUpload.FileUpload(file, `${userType}/images`);
    const Schema = GetUserSchema(userType);

    const updateUser = await Schema.findOneAndUpdate(
      { _id },
      {
        $set: {
          profilImage: imageData.url,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "updated successfully", data: updateUser });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ChangePassword = async (req, res) => {
  try {
    const _id = req.user._id;
    const { password, oldpassword, confpassword } = req.body;

    const Schema = GetUserSchema(req.userType);

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

    const updateUser = await Schema.findOneAndUpdate(
      { _id },
      {
        $set: {
          password: cryptedMdp,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "updated successfully", data: updateUser });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const { email, userType } = req.body;
    const Schema = GetUserSchema(userType);

    if (!email) {
      return res
        .status(400)
        .json({ Message: "email is required", Success: false });
    }
    const existUser = await Schema.findOne({ email });

    if (!existUser) {
      return res.status(400).json({
        Message: "there's no user with that email",
        Success: false,
      });
    }

    const password = GeneratePassword.GeneratePass();
    const salt = process.env.SALT;
    const cryptedMdp = await bcrypt.hash(password, Number(salt));

    const updateUser = await Schema.findOneAndUpdate(
      { _id: existUser._id },
      {
        $set: {
          password: cryptedMdp,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }

    // SENDING THE LOGIN AND PASSWORD TO USER WITH MAIL
    let subject = "Password Recover";
    let content = `
          <div>
          <h2>Welcome ${existUser.firstName} ${existUser.lastName} to our plateforme</h2>
          <p>we recieved a request to recover your password</p>
          <p>your new password is : <b>${password}</b> </p>
          <p>please make sure to change your password after you access to your account</p>
          </div>`;
    await Mailer.Mail_Sender(existUser.email, content, subject);

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
    const Schema = GetUserSchema(req.userType);

    if (!email) {
      return res
        .status(406)
        .json({ Message: "email field is emtpy", Success: false });
    }

    const existUser = await Schema.findOne({ email });

    if (existUser) {
      return res.status(409).json({
        Message: "user already exists with that email",
        Success: false,
      });
    }

    const updateUser = await Schema.findOneAndUpdate(
      { _id },
      {
        $set: {
          email: email,
        },
      },
      { new: true }
    );
    if (!updateUser) {
      return res.status(400).json({
        Message: "Failed to update",
        Success: false,
      });
    }
    return res
      .status(200)
      .json({ Message: "updated successfully", data: updateUser });
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
