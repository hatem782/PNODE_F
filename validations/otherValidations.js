const Joi = require("joi");

const validationEvent = Joi.object({
  eventDate: Joi.date().required(),
  eventType: Joi.string().valid("JPO", "journéé d'integration ", "formation"),
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

module.exports = { createEventValidation };
