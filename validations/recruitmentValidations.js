const Joi = require("joi");

const validationRecruitment = Joi.object({
  state: Joi.string().valid("Rejected", "Accepted", "In progress"),
  type: Joi.string().valid("Temporary", "Expert").required(),
  skills: Joi.array().items(Joi.string()).required(),
  description: Joi.string().required(),
});

const validationAskingRecruitment = (req, res, next) => {
  const validation = validationRecruitment.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};
module.exports = { validationAskingRecruitment };
