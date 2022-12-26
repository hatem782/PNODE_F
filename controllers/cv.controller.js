const CvModule = require("../models/cv.model");

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

    if (!cv)
      return res.status(400).json({
        Message: "error while saving cv",
        Success: false,
      });

    console.log(cv);
    return res.status(200).json({
      Message: "cv created suucessfully",
      Success: true,
      data: cv,
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

module.exports = {
  CreateCv,
  GetAllCvs,
};
