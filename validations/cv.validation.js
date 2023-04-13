const Joi = require("joi");

const validationCv = Joi.object({
  bio: Joi.string().required(),
  localisation: Joi.string().required(),
  linkedIn: Joi.string().required(),
  experiences: Joi.array().required(),
  formations: Joi.array().required(),
  languages: Joi.array().required(),
  hard_skills: Joi.array().required(),
  soft_skills: Joi.array().required(),
  hobbys: Joi.array().required(),
  style: Joi.number().required(),
});

const create_and_update_Cv_Validation = (req, res, next) => {
  const validation = validationCv.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

module.exports = { create_and_update_Cv_Validation };
