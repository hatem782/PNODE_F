const Joi = require("joi");
const TechnologieModel = require("../models/technologie.module");

const validationTechnologie = Joi.object({
  title: Joi.string().required(),
});

const CreateTechnologie = async (req, res) => {
  // #swagger.tags = ['Technologie apis']
  // #swagger.description = 'Endpoint for creation of Technologie \n Example : Node js , React js, Next js , Flutter  '
  // #swagger.parameters['title'] = { description: 'title of Technologie .' }
  try {
    const { title } = req.body;
    const validation = validationTechnologie.validate(req.body);
    if (validation.error)
      return res
        .status(400)
        .json({ Message: validation.error.details[0].message, Success: false });

    const existTechnologie = await TechnologieModel.findOne({ title });
    if (existTechnologie)
      return res.status(409).json({
        Message: "Technologie already exist",
        Success: false,
      });
    const newTechnologie = new TechnologieModel({
      title,
    });
    const createdTechnologie = await newTechnologie.save();
    return res.status(200).json({
      Message: "Technologie created suucessfully",
      Success: true,
      data: createdTechnologie,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const DeleteTechnologie = async (req, res) => {
  // #swagger.tags = ['Technologie apis']
  // #swagger.description = 'Endpoint Technologie  delete by given id  '

  try {
    const { _id } = req.params;
    const removeTechnologie = await TechnologieModel.deleteOne({ _id });

    if (!removeTechnologie) {
      return res.status(400).json({ Message: "Failed to delete Technologie" });
    }
    return res
      .status(200)
      .json({ Message: "Technologie deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllTechnologies = async (req, res) => {
  try {
    const Technologies = await TechnologieModel.find();
    return res
      .status(200)
      .json({
        Message: "Technologies found successfully ",
        data: Technologies,
      });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  CreateTechnologie,
  DeleteTechnologie,
  GetAllTechnologies,
};
