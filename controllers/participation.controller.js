const Joi = require("joi");
const ParticipationModel = require("../models/Participation.model");

const CreateParticipation = async (req, res) => {
  try {
    const { _idEvent } = req.params;
    const _idStudent = req.user._id;
    console.log(_idStudent);

    const existParticipation = await ParticipationModel.findOne({
      studentId: _idStudent,
      eventId: _idEvent,
    });
    if (existParticipation)
      return res.status(409).json({
        Message: "Participation already exist for that event",
        Success: false,
      });
    const newParticipation = new ParticipationModel({
      studentId: req.user._id,
      eventId: _idEvent,
    });
    const createdParticipation = await newParticipation.save();
    return res.status(200).json({
      Message: "Participation created suucessfully",
      Success: true,
      data: createdParticipation.populate("eventId"),
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateParticipation = async (req, res) => {
  try {
    const { _idEvent } = req.params;
    const _idStudent = req.user._id;

    const participation = await ParticipationModel.findOne({
      studentId: _idStudent,
      eventId: _idEvent,
    });
    console.log(participation.confirmation);
    const updateParticipation = await ParticipationModel.findOneAndUpdate(
      { studentId: _idStudent, eventId: _idEvent },
      { confirmation: !participation.confirmation },
      { new: true }
    );
    if (!updateParticipation) {
      return res.status(400).json({
        Message: "Failed to update Participation",
        Success: false,
      });
    }
    return res.status(200).json({
      Message: "Participation updated successfully",
      data: updateParticipation,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllParticipationsConfirmed = async (req, res) => {
  try {
    const Participations = await ParticipationModel.find({
      confirmation: true,
    }).populate("eventId");
    if (Participations.length == 0)
      return res
        .status(400)
        .json({ Message: "Failed to find Participation", Success: false });

    return res.status(200).json({
      Message: "Participations found successfully ",
      data: Participations,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  CreateParticipation,
  UpdateParticipation,
  GetAllParticipationsConfirmed,
};
