const RecruitmentModel = require("../models/recruitment.model");
const { filt_year_parser } = require("../functions/FiltYearParser");

const askingForRecruitment = async (req, res) => {
  try {
    const { type, skills, description, state } = req.body;
    const _idStudent = req.user._id;
    console.log(_idStudent);

    console.log("*******");
    const existRecruitment = await RecruitmentModel.findOne({
      type,
      studentId: _idStudent,
    });
    if (existRecruitment)
      return res.status(409).json({
        Message: "you already posted for recuirment for these position",
        Success: false,
      });
    const newRequest = new RecruitmentModel({
      studentId: _idStudent,
      state,
      type,
      skills,
      description,
    });
    const createdRequest = await newRequest.save();
    return res.status(200).json({
      Message: "recruitment request created sucessfully",
      Success: true,
      data: createdRequest,
    });
  } catch (error) {}
};

const GetAllTemporaryRecruitment = async (req, res) => {
  try {
    const { saison } = req.query;
    let filter = await filt_year_parser({ type: "Temporary" }, saison);
    const TemporaryRecruitment = await RecruitmentModel.find(filter).populate(
      "studentId"
    );
    if (!TemporaryRecruitment)
      return res.status(400).json({
        Message: "Failed to find TemporaryRecruitment",
        Success: false,
      });

    return res.status(200).json({
      Message: "TemporaryRecruitment found successfully ",
      data: TemporaryRecruitment,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
const GetAllExpertRecruitment = async (req, res) => {
  try {
    const { saison } = req.query;
    let filter = await filt_year_parser({ type: "Expert" }, saison);
    const ExpertRecruitment = await RecruitmentModel.find(filter).populate(
      "studentId"
    );
    if (!ExpertRecruitment)
      return res
        .status(400)
        .json({ Message: "Failed to find ExpertRecruitment", Success: false });

    return res.status(200).json({
      Message: "ExpertRecruitment found successfully ",
      data: ExpertRecruitment,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};


const GetAll= async (req, res) => {
  try {
    const { saison } = req.query;
    let filter = await filt_year_parser(saison);
    const AllRecruitment = await RecruitmentModel.find(filter).populate(
      "studentId"
    );
    if (!AllRecruitment)
      return res
        .status(400)
        .json({ Message: "Failed to find AllRecruitment", Success: false });

    return res.status(200).json({
      Message: "AllRecruitment found successfully ",
      data: AllRecruitment,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  askingForRecruitment,
  GetAllTemporaryRecruitment,
  GetAllExpertRecruitment,
  GetAll
};
