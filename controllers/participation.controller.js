const Joi = require('joi');
const ParticipationModel = require("../models/Participation.model")



const CreateParticipation =  async(req,res) => {
    try {
      const { _idEvent ,_idStudent} = req.params; //houni id student bich nwali ne5thou m token 
    
        const existParticipation = await ParticipationModel.findOne({ _idStudent });
        if(existParticipation)   return res.status(409).json({
           Message: "Participation already exist",
           Success: false,
         }); 
         const newParticipation = new ParticipationModel({
          studentId:_idStudent,
          eventId:_idEvent,

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
}



const UpdateParticipation = async (req, res) => {
  try {
    const { _idEvent ,_idStudent} = req.params;
    //houni id student bich nwali ne5thou m token 
 
    const participation = await ParticipationModel.findOne(  { _idEvent,_idStudent } )
    console.log(participation.confirmation)
    const updateParticipation = await ParticipationModel.findOneAndUpdate(   
      { _idEvent,_idStudent } ,
      { confirmation: !participation.confirmation }, { new: true } ) 
    if (!updateParticipation) {
      return res.status(400).json({
        Message: "Failed to update Participation",
        Success: false,
      });
    }
    return res.status(200).json({ Message: "Participation updated successfully",data: updateParticipation });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};


const GetAllParticipationsConfirmed = async (req,res) => {
try {
  const Participations = await ParticipationModel.find({confirmation: true}).populate("eventId")
  if(Participations.length== 0) return res.status(400).json({ Message: "Failed to find Participation", Success: false});

  return res.status(200).json({Message: 'Participations found successfully ', data: Participations})
} catch (error) {
  console.log("##########:", error);
  res.status(500).send({ Message: "Server Error", Error: error.message });
}
}



module.exports ={
    CreateParticipation,UpdateParticipation,GetAllParticipationsConfirmed
}