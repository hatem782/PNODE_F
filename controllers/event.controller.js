const Joi = require('joi');
const EventModel = require("../models/event.model")


const validationEvent = Joi.object({ 
    eventDate: Joi.date().required(),
    eventType: Joi.string().valid('JPO', "journéé d'integration ", 'formation'),
    description: Joi.string().required(),
    eventName: Joi.string().required()



} )

const CreateEvent =  async(req,res) => {
    try {
        const {
            eventDate,
            eventType,
            description,
            eventName
           
          } = req.body;
        const validation =  validationEvent.validate(req.body);
        if(validation.error) return res.status(400).json({ Message: validation.error.details[0].message, Success: false });

        const existEvent = await EventModel.findOne({  eventDate, eventType });
        if(existEvent)   return res.status(409).json({
           Message: "Event already exist",
           Success: false,
         }); 
         const newEvent = new EventModel({
            eventDate,
            eventType,
            description,
            eventName
          
          });
          const createdEvent = await newEvent.save();
          return res.status(200).json({
            Message: "Event created suucessfully",
            Success: true,
            data: createdEvent,
          });


    } catch (error) {
        console.log("##########:", error);
        res.status(500).send({ Message: "Server Error", Error: error.message });
    }
}



const UpdateEvent = async (req, res) => {
  try {
    const { _id } = req.params;
    const {
        eventDate,
        eventType,
        description,
        eventName
    } = req.body;
 

    const updateEvent = await EventModel.findOneAndUpdate(
      { _id },
      {
        $set: {
            eventDate,
            eventType,
            description,
            eventName
        },
      },
      { new: true } // return new Event with update
    );
    if (!updateEvent) {
      return res.status(400).json({
        Message: "Failed to update Event",
        Success: false,
        data: updateEvent,
      });
    }
    return res.status(200).json({ Message: "event updated successfully",data: updateEvent });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const DeleteEvent = async (req,res) => {
  try {
    const {_id} = req.params
    const removeEvent = await EventModel.deleteOne({_id})

    if (!removeEvent) {
      return res.status(400).json({ Message: "Failed to delete Event" });
    }
    return res.status(200).json({ Message: "Event deleted successfully" });


  } catch (error) {
     console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
}

const GetAllEvents = async (req,res) => {
try {
  const Events = await EventModel.find()
  return res.status(200).json({Message: 'Events found successfully ', data: Events})
} catch (error) {
  console.log("##########:", error);
  res.status(500).send({ Message: "Server Error", Error: error.message });
}
}



module.exports ={
    CreateEvent,UpdateEvent,DeleteEvent,GetAllEvents
}