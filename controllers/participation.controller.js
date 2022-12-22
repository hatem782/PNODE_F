const Joi = require("joi");
const ParticipationModel = require("../models/Participation.model");
const studentModule = require("../models/user.module");
const mongoose = require("mongoose");
const eventModel = require("../models/event.model");
const Mailer = require("../mails/Mail_Sender");

//student
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
      confirmation: true,
    });
    const createdParticipation = await newParticipation.save();
    return res.status(200).json({
      Message: "Participation created suucessfully",
      Success: true,
      data: createdParticipation,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

// admin lil alumnie
const CreateInvitation = async (req, res) => {
  try {
    const { _idEvent, _idStudent } = req.params;
    console.log(_idStudent);
    const student = await studentModule.findById({
      _id: _idStudent,
    });

    const event = await eventModel.findById({
      _id: _idEvent,
    });

    if (!student || student.isAluminie == false)
      return res.status(409).json({
        Message: "student don't exist or is not aluminie",
        Success: false,
      });

    const existInvitation = await ParticipationModel.findOne({
      eventId: _idEvent,
      studentId: _idStudent,
      isInvitation: true,
    });
    if (existInvitation)
      return res.status(409).json({
        Message: "invitation already exist for that event",
        Success: false,
      });

    const newInvitation = new ParticipationModel({
      studentId: _idStudent,
      eventId: _idEvent,
      isInvitation: true,
    });

    let subject = "Invitation";
    let content = `
    <div>
    <h2> Hi ${student.firstName} ${student.lastName}, </h2>
    <p> we hope that you are doing well </p>
    <p>Have you heard the news? Something big is coming from ISAMM.</p>
    <p>You are invited to join us at ${event.location} on  ${event.eventDate} to our big event  <b> ${event.eventName}<b>  . </p>
    <p>For more details about the event and to confirm your participation please check link below.</p>
    <a href="">  confirmation </a>
     </div>`;

    await Mailer.Mail_Sender(student.email, content, subject);
    const createdInvitation = await newInvitation.save();
    return res.status(200).json({
      Message: "invitation created suucessfully",
      Success: true,
      data: createdInvitation,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

// student
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

// alumnie
const UpdateInvitation = async (req, res) => {
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
      Message: "confirmation to invitation  updated successfully",
      data: updateParticipation,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
//admin
const GetAllParticipationsConfirmed = async (req, res) => {
  try {
    const _idEvent = req.params;
    const Participations = await ParticipationModel.find({
      confirmation: true,
      isInvitation: false,
      _idEvent,
    }).populate("eventId");
    if (!Participations)
      return res.status(400).json({
        Message: "Failed to find Participation to that event",
        Success: false,
      });

    return res.status(200).json({
      Message: "Participations found successfully ",
      data: Participations,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllInvitationConfirmed = async (req, res) => {
  try {
    const _idEvent = req.params;
    const Participations = await ParticipationModel.find({
      confirmation: true,
      isInvitation: true,
      _idEvent,
    }).populate("eventId");
    if (!Participations)
      return res
        .status(400)
        .json({ Message: "Failed to find invitation", Success: false });

    return res.status(200).json({
      Message: "invitation found successfully ",
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
  CreateInvitation,
  UpdateInvitation,
  GetAllInvitationConfirmed,
};
