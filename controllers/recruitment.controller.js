const Joi = require("joi");
const RecruitmentModel = require("../models/recruitment.model");

const validationRecruitment = Joi.object({
  state: Joi.string().valid("Rejected", "Accepted", "In progress").required(),
  type: Joi.string().valid("Temporary", "Expert").required(),
  skills: Joi.array().items(Joi.string()).required(true),
  description: Joi.string().required(),
  date: Joi.date(),
});

const askingForRecruitment = async (req, res) => {
  try {
    const { state, type, skills, description } = req.body;
    const _idStudent = req.user._id;

    const validation = validationRecruitment.validate(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ Message: validation.error.details[0].message, Success: false });

    const existRecruitment = await RecruitmentModel.findOne({
      type,
      studentId: _idStudent,
    });
    if (existRecruitment)
      return res.status(409).json({
        Message: "recruitment request already exist",
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
    const TemporaryRecruitment = await RecruitmentModel.find({
      type: "Temporary",
    }).populate("studentId");
    if (!Participations)
      return res
        .status(400)
        .json({
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
    const TemporaryRecruitment = await RecruitmentModel.find({
      type: "Expert",
    }).populate("studentId");
    if (!Participations)
      return res
        .status(400)
        .json({ Message: "Failed to find ExpertRecruitment", Success: false });

    return res.status(200).json({
      Message: "ExpertRecruitment found successfully ",
      data: TemporaryRecruitment,
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
};
