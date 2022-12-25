const Joi = require("joi");
const ProjectModel = require("../models/project.module");
var mongoose = require('mongoose');
const VerifToken = require("../middlewares/VerifToken");



const validationProject = Joi.object({
  title: Joi.date().required(),
  type: Joi.string().valid("PFA", "PFE", "Stage"),
  description: Joi.string().required(),
});

const CreateProject = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint Porjects either PFA , PFE or stage management and creation '



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

    const existProject = await ProjectModel.findOne({ encadrants, students, startDate });
    if (existProject)
      return res.status(409).json({
        Message: "Project already exist",
        Success: false,
      });
    console.log(req.params)
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
      case ('PFA'):
        {
          //verify if teacher


          const createdProject = await newProject.save();
          return res.status(200).json({
            Message: "Project created suucessfully",
            Success: true,
            data: createdProject,
          });

        }
        break;
      case ('PFE'):
        {

          const createdProject = await newProject.save();
          return res.status(200).json({
            Message: "Project created suucessfully",
            Success: true,
            data: createdProject,
          });

        }
        break;
      //stage 
      default:
        {

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


const CreatePFA = async (req, res) => {
// #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint create stage PFA by teahchers only '



  try {
    const {
      title,
      description,
      type,
      encadrants,
      technologies,
      nbr_students_max,
      startDate,
      endDate,
    } = req.body;

    const newProject = new ProjectModel({
      title: title,
      description: description,
      type: type,
      encadrants: encadrants,
      technologies: technologies,
      nbr_students_max: nbr_students_max,
      startDate: startDate,
      endDate: endDate,
    });


    const createdProject = await newProject.save();
    return res.status(200).json({
      Message: "Project PFE created suucessfully",
      Success: true,
      data: createdProject,
    });

  }
  catch (error) {

  }
}


const CreatePFE = async (req, res) => {
// #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint Create stage PFE '



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

    const newProject = new ProjectModel({
      title: title,
      description: description,
      type: type,
      societe: societe,
      students: students,
      technologies: technologies,
      startDate: startDate,
      endDate: endDate,
    });


    const createdProject = await newProject.save();
    return res.status(200).json({
      Message: "Project PFE created suucessfully",
      Success: true,
      data: createdProject,
    });

  }
  catch (error) {

  }
}

const CreateStage = async (req, res) => {

  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint Create Stage'


  try {
    const {
      title,
      description,
      type,
      students,
      technologies,
      societe,
      startDate,
      endDate,
    } = req.body;

    const newProject = new ProjectModel({
      title: title,
      description: description,
      type: type,
      societe: societe,
      students: students,
      technologies: technologies,
      startDate: startDate,
      endDate: endDate,
    });


    const createdProject = await newProject.save();
    return res.status(200).json({
      Message: "Project PFE created suucessfully",
      Success: true,
      data: createdProject,
    });

  }
  catch (error) {

  }
}

const GetProjectsContainingTechnologies = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint retun list projects by given technologies '

  try {
    const listProjects = await ProjectModel.find({ technologies: { $all: req.body.technologies } });
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: listProjects });
  }
  catch (error) {
    console.log("#####[ERROR]##### : ", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
}


const GetProjectsByListTeachers = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint retun list projects teachers  '



  try {
    //list of projects containing all items if list teacher ids 
    const listProjects = await ProjectModel.find({ encadrants: { $all: req.body.teachers } });
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: listProjects });
  } catch (error) {
    console.log("#####[ERROR]##### : ", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
}

const GetAllProjects = async (req, res) => {

  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint retun all projects list '

  try {
    const Projects = await ProjectModel.find();
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: Projects });
  } catch (error) {
    console.log("#####[ERROR]##### : ", error);
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


const AffectStudentToProject = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'assign student to project'

  const { _id, idStudent } = req.params;
  var idStudentObj = mongoose.Types.ObjectId(idStudent);

  try {
    const affectStudent = await ProjectModel.findOneAndUpdate(
      { _id },
      {
        $push: {
          students: idStudentObj,
        },
      },
      { new: true } // return new project with update
    ); if (!affectStudent) {
      return res.status(400).json({
        Message: "Failed to affect student to project",
        Success: false,
        data: affectStudent,
      });
    }
    return res
      .status(200)
      .json({ Message: "teacher updated successfully", data: affectStudent });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }


}

const AffectTeacherToProject = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'assign student to project'

  const { _id, idTeacher } = req.params;
  var teacher = mongoose.Types.ObjectId(idTeacher);

  try {
    const affectedTeacher = await ProjectModel.findOneAndUpdate(
      { _id },
      {
        $push: {
          encadrants: teacher,
        },
      },
      { new: true } // return new project with update
    ); if (!affectedTeacher) {
      return res.status(400).json({
        Message: "Failed to affect student to project",
        Success: false,
        data: affectedTeacher,
      });
    }
    return res
      .status(200)
      .json({ Message: "teacher updated successfully", data: affectedTeacher });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }


}


module.exports = {
  CreateProject,
  GetAllProjects,
  GetAllProjectsByType,
  GetProjectsByListTeachers,
  AffectStudentToProject,
  AffectTeacherToProject,
  GetProjectsContainingTechnologies,
  CreatePFA,
  CreatePFE,
  CreateStage
};
