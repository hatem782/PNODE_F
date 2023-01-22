const Joi = require("joi");

// ######### Participations
const validationParticipation = Joi.object({
  _idEvent: Joi.required(),
});
const validationParticipationCreate = (req, res, next) => {
  const validation = validationParticipation.validate(req.params);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

//#################  Event

const validationEvent = Joi.object({
  eventDate: Joi.date().required(),
  eventType: Joi.string().valid("JPO", "Journée d'integration", "Formation"),
  description: Joi.string().required(),
  eventName: Joi.string().required(),
  location: Joi.string(),
});

const createEventValidation = (req, res, next) => {
  console.log(req.body);
  const validation = validationEvent.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

module.exports = { validationParticipationCreate, createEventValidation };
