const Joi = require("joi");

// ********** TEACHER
const validationCreateTeacher = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  birthDate: Joi.string(),
  phoneNumber: Joi.number().integer(),
  sex: Joi.string().required(),
  email: Joi.string().required().email(),
  course: Joi.array().items(Joi.string()),
});

const createTeacherValidation = (req, res, next) => {
  const validation = validationCreateTeacher.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

const validationUpdateTeacher = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  birthDate: Joi.string(),
  phoneNumber: Joi.number().integer(),
  sex: Joi.string().required(),
  course: Joi.array().items(Joi.string()),
});

const updateTeacherValidation = (req, res, next) => {
  const validation = validationUpdateTeacher.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

// ********** STUDENT

const validationCreateStudent = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  birthDate: Joi.string(),
  phoneNumber: Joi.number().integer(),
  sex: Joi.string().required(),
  email: Joi.required().email(),
  userName: Joi.string().required(),
  classe: Joi.string().required(),
  niveau: Joi.string().required(),
  numero_classe: Joi.number(),
  promotion: Joi.string().required(),
});

const createStudentValidation = (req, res, next) => {
  const validation = validationCreateStudent.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

const validationUpdateStudent = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  birthDate: Joi.string(),
  phoneNumber: Joi.number().integer(),
  sex: Joi.string().required(),
  classe: Joi.string().required(),
  niveau: Joi.string().required(),
  numero_classe: Joi.number(),
  promotion: Joi.string().required(),
});

const UpdateStudentValidation = (req, res, next) => {
  const validation = validationUpdateStudent.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

// ********** ALUMINIE

const validationCreateAluminie = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  birthDate: Joi.string(),
  phoneNumber: Joi.number().integer(),
  sex: Joi.string().required(),
  email: Joi.required().email(),
  userName: Joi.string().required(),
  promotion: Joi.string().required(),
  diplome: Joi.string().required(),
  password: Joi.string().required(),
});

const createAlumnieValidation = (req, res, next) => {
  const validation = validationCreateAluminie.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

const validationUpdateAluminie = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string(),
  birthDate: Joi.string(),
  phoneNumber: Joi.number().integer(),
  sex: Joi.string().required(),
  promotion: Joi.string().required(),
  diplome: Joi.string().required(),
});

const updateAlumnieValidation = (req, res, next) => {
  const validation = validationUpdateAluminie.validate(req.body);
  if (validation.error)
    return res
      .status(400)
      .json({ Message: validation.error.details[0].message, Success: false });

  next();
};

module.exports = {
  createTeacherValidation,
  createStudentValidation,
  createAlumnieValidation,
  UpdateStudentValidation,
  updateAlumnieValidation,
  updateTeacherValidation,
};
