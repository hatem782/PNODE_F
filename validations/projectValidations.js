const Joi = require("joi");
const validationGeneral = Joi.object({
    type: Joi.string().valid("PFE", "PFA","STAGE").required(),
    title: Joi.string().required(),
    description: Joi.string(),
    technologies: Joi.array(),
    startDate:Joi.date().required(),
    endDate:Joi.date(),
  });


  const validationPFE = Joi.object({
    type: Joi.string().valid("PFE", "PFA","STAGE").required(),
    title: Joi.string().required(),
    description: Joi.string(),
    technologies: Joi.array(),
    students: Joi.array().required(),
    startDate:Joi.date().required(),
    endDate:Joi.date(),
    societe:Joi.string(),
  });

  const validationPFA = Joi.object({
    type: Joi.string().valid("PFE", "PFA","STAGE").required(),
    title: Joi.string().required(),
    description: Joi.string(),
    technologies: Joi.array(),
    encadrants: Joi.array().required(),
    startDate:Joi.date().required(),
    endDate:Joi.date(),
    nbr_students_max:Joi.number().integer(),
  });



  const validateCreatePFE = (req, res, next) => {
    const validation = validationPFE.validate(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ Message: validation.error.details[0].message, Success: false });
  
    next();
  };


  const validateCreatePFA= (req, res, next) => {
    const validation = validationPFA.validate(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ Message: validation.error.details[0].message, Success: false });
  
    next();
  };


  const validateCreateStage= (req, res, next) => {
    const validation = validationGeneral.validate(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ Message: validation.error.details[0].message, Success: false });
  
    next();
  };


  module.exports = {
    validateCreatePFA,
    validateCreatePFE,
    validateCreateStage
  };
