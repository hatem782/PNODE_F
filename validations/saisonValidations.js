const Joi = require("joi");

// ######### Participations
const validation_saison = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

const validationSaisonCreate = (req, res, next) => {
  const validation = validation_saison.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

module.exports = { validationSaisonCreate };
