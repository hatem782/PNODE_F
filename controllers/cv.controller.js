const CvModule = require("../models/cv.model");
const UserModule = require("../models/user.module");

const CreateCv = async (req, res) => {
  try {
    const userId = req.user._id;
    const cvAlreadyExist = await CvModule.findOne({ student: userId });
    if (cvAlreadyExist) {
      return res.status(400).json({
        Message: "user already have a cv please update it",
        Success: false,
      });
    }

    const newCv = new CvModule({
      ...req.body,
      student: req.user._id,
    });

    const cv = await newCv.save();

    if (!cv) {
      return res.status(400).json({
        Message: "error while saving cv",
        Success: false,
      });
    }

    return res.status(200).json({
      Message: "cv created successfully",
      Success: true,
      data: cv,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const getcvbyuser = async (req, res) => {
  try {
    const userId = req.user.cv;
    const cvAlreadyExist = await CvModule.findOne({ student: userId });
    if (!cvAlreadyExist) {
      return res.status(400).json({
        Message: "that user dosen't have a cv please create it",
        Success: false,
      });
    }

    return res.status(200).json({
      Message: "cv retreaved successfully",
      Success: true,
      data: cvAlreadyExist,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllCvs = async (req, res) => {
  try {
    const cvs = await CvModule.find().populate("student");
    return res
      .status(200)
      .json({ Message: "cvs found successfully ", data: cvs });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateCv = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedCv = await CvModule.findOneAndUpdate(
      { student: userId },
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedCv) {
      return res.status(400).json({
        Message: "error while saving cv",
        Success: false,
      });
    }

    return res.status(200).json({
      Message: "cv upated successfully",
      Success: true,
      data: updatedCv,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  getcvbyuser,
  CreateCv,
  GetAllCvs,
  UpdateCv,
};
