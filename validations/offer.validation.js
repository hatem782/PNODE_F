const Joi = require("joi");

const validationOffer = Joi.object({
  offerName: Joi.string().required(),
  offerType: Joi.string().valid(
    "Conseil",
    "Offre",
    "Opportunité",
    "Offre d'emploi"
  ),
  description: Joi.string().required(),
  location: Joi.string().required(),
});

const createOfferValidation = (req, res, next) => {
  console.log(req.body);
  const validation = validationOffer.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

module.exports = { createOfferValidation };
