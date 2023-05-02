const Joi = require("joi");

const validationProject = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  encadrant_id: Joi.string().allow(null, "", ""),
  technologies: Joi.array().required(),
  societe: Joi.string().required(),
  type: Joi.string().valid("PFE", "PFA", "STAGE").required(),
  promotion: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

const validationProject2 = Joi.object({
  _id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().required(),
  technologies: Joi.array().required(),
  societe: Joi.string().required(),
  type: Joi.string().valid("PFE", "PFA", "STAGE").required(),
  promotion: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

const validate_validate_by_ensg = Joi.object({
  _id: Joi.string().required(),
  encadrant: Joi.string().required(),
});

const validate_validate_by_admin = Joi.object({
  _id: Joi.string().required(),
});

const validateCreateProject = (req, res, next) => {
  const validation = validationProject.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

const validateUpdateProject = (req, res, next) => {
  const validation = validationProject2.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

const validate_validate_by_ensgFunc = (req, res, next) => {
  const validation = validate_validate_by_ensg.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

const validate_validate_by_adminFunc = (req, res, next) => {
  const validation = validate_validate_by_admin.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

module.exports = {
  validateCreateProject,
  validateUpdateProject,
  validate_validate_by_ensgFunc,
  validate_validate_by_adminFunc,
};
