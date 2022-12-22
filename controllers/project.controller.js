const Joi = require("joi");
const ProjectModel = require("../models/project.module");
const studentModule = require("../models/user.module");
const teacherModel = require("../models/user.module");

const validationProject = Joi.object({
  title: Joi.date().required(),
  type: Joi.string().valid("PFA", "PFE", "Stage"),
  description: Joi.string().required(),
});
const CreateProject = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint Porjects either PFA , PFE or stage management and creation '
  // #swagger.parameters['title'] = { description: 'title of project .' }
  // #swagger.parameters['description'] = { description: 'title of project .' }
  // #swagger.parameters['type'] = { description: 'type of project  [PFA | PFE | stage].' }
  // #swagger.parameters['students'] = { description: 'list of objectIds of students applied to project  if PFA apply after project creation if PFE or stage on creation' }
  // #swagger.parameters['encadrants'] = { description: 'list of encadrants  of project as objectIds if PFA only encadrant that created project , PFE might contain list .' }
  // #swagger.parameters['technologies'] = { description: 'list of technologies required for project .' }

  try {
    const {
      title,
      description,
      type,
      students,
      encadrants,
      technologies,
      societe,
      nbr_students_max,
      startDate,
      endDate,
      isValidatedByReponsable,
    } = req.body;

    const existProject = await ProjectModel.findOne({
      encadrants,
      students,
      startDate,
    });
    if (existProject)
      return res.status(409).json({
        Message: "Project already exist",
        Success: false,
      });
    console.log(req.params);
    const newProject = new ProjectModel({
      title: title,
      description: description,
      type: type,
      students: students,
      encadrants: encadrants,
      technologies: technologies,
      nbr_students_max: nbr_students_max,
      startDate: startDate,
      endDate: endDate,
      isValidatedByReponsable: isValidatedByReponsable,
    });
    console.log("######[" + JSON.stringify(newProject) + "]######:");

    switch (type) {
      case "PFA":
        {
          //is created by teacher test token teacher
          //does encadrant 1 only exist
          if (encadrants) {
            // exists teacher
            const existTeacher = await teacherModel.findOne({
              _id: encadrants[0],
            });
          }

          const createdProject = await newProject.save();
          return res.status(200).json({
            Message: "Project created suucessfully",
            Success: true,
            data: createdProject,
          });
        }
        break;
      case "PFE":
        {
          const existsStudents = await studentModule.find({ _id: students });

          //does students exist
          if (!existsStudents) {
            return res.status(500).json({
              Message: "Students does not exist",
              Success: false,
            });
          }
          // const existSociete=await societeModule.find({ _id:societe });
          const existSociete = true;
          if (!existSociete) {
            return res.status(500).json({
              Message: "Societé does not exist",
              Success: false,
            });
          }
          const createdProject = await newProject.save();
          return res.status(200).json({
            Message: "Project created suucessfully",
            Success: true,
            data: createdProject,
          });
        }
        break;
      //stage
      default: {
        // const existSociete=await societeModule.find({ _id:societe });
        const existSociete = true;
        if (!existSociete) {
          return res.status(500).json({
            Message: "Societé does not exist",
            Success: false,
          });
        }
        const createdProject = await newProject.save();
        return res.status(200).json({
          Message: "Project created suucessfully",
          Success: true,
          data: createdProject,
        });
      }
    }
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetProjectsContainingTechnologies = async (req, ress) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint retun list projects by given technologies '
};

const GetAllProjects = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint retun all projects list '

  try {
    const Projects = await ProjectModel.find();
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: Projects });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllProjectsByType = async (req, res) => {
  const { type } = req.params;
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint return  projects list by given type'
  // #swagger.parameters['type'] = { description: 'type of projects to return  .' }
  try {
    const Projects = await ProjectModel.find({ type });
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: Projects });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  CreateProject,
  GetAllProjects,
  GetAllProjectsByType,
};
