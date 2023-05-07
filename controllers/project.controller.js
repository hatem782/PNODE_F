const ProjectModel = require("../models/project.module");
const TechnoModel = require("../models/technologie.module");
const { filt_year_parser } = require("../functions/FiltYearParser");

var mongoose = require("mongoose");

const CreateProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      societe,
      startDate,
      endDate,
      type,
      promotion,
    } = req.body;

    const student = req.user;

    const existProject = await ProjectModel.findOne({
      promotion,
      students: [student._id],
      type: "PFE",
    });

    if (existProject && type !== "STAGE")
      return res.status(409).json({
        Message: "You already created a PFE for this promotion, update it",
        Success: false,
      });

    for (let i = 0; i < technologies.length; i++) {
      let exist = await TechnoModel.findOne({ title: technologies[i] });

      if (!exist) {
        const newTech = await new TechnoModel({
          title: technologies[i],
        }).save();
        console.log(newTech);
      }
    }

    const project_life_cycle =
      type === "STAGE" ? "Pending_Validation" : "Pending_Teacher";

    const newProject = new ProjectModel({
      title: title,
      description: description,
      type: type,
      students: [student._id],
      encadrant: null,
      technologies: technologies,
      startDate: startDate,
      endDate: endDate,
      societe: societe,
      promotion: promotion,
      project_life_cycle: project_life_cycle,
    });
    console.log("######[" + JSON.stringify(newProject) + "]######:");

    const createdProject = await newProject.save();
    return res.status(200).json({
      Message: "Project created suucessfully",
      Success: true,
      data: createdProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

//create-PFA
const CreatePFA = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies = [],
      startDate,
      endDate,
      promotion,
    } = req.body;

    const teacher = req.user;

    for (let i = 0; i < technologies.length; i++) {
      let exist = await TechnoModel.findOne({ title: technologies[i] });
      if (!exist) {
        const newTech = await new ProjectModel({
          title: technologies[i],
        }).save();
        console.log(newTech);
      }
    }

    const newProject = new ProjectModel({
      title: title,
      description: description,
      type: "PFA",
      students: null,
      encadrant: teacher._id,
      technologies: technologies,
      startDate: startDate,
      endDate: endDate,
      promotion: promotion,
      project_life_cycle: "Pending_Accept_By_Resp",
    });
    console.log("######[" + JSON.stringify(newProject) + "]######:");

    const createdProject = await newProject.save();
    return res.status(200).json({
      Message: "Project PFA created suucessfully",
      Success: true,
      data: createdProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateMyProject = async (req, res) => {
  try {
    const {
      _id,
      title,
      description,
      technologies,
      societe,
      startDate,
      endDate,
      promotion,
    } = req.body;

    for (let i = 0; i < technologies.length; i++) {
      let exist = await TechnoModel.findOne({ title: technologies[i] });

      if (!exist) {
        const newTech = await new TechnoModel({
          title: technologies[i],
        }).save();
        console.log(newTech);
      }
    }

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: _id },
      {
        title: title,
        description: description,
        encadrant: null,
        technologies: technologies,
        startDate: startDate,
        endDate: endDate,
        societe: societe,
        promotion: promotion,
      },
      { new: true }
    );
    console.log("######[" + JSON.stringify(updatedProject) + "]######:");

    return res.status(200).json({
      Message: "Project Updated suucessfully",
      Success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdatePFA = async (req, res) => {
  try {
    const {
      _id,
      title,
      description,
      technologies,
      startDate,
      endDate,
      promotion,
    } = req.body;

    for (let i = 0; i < technologies.length; i++) {
      let exist = await TechnoModel.findOne({ title: technologies[i] });

      if (!exist) {
        const newTech = await new TechnoModel({
          title: technologies[i],
        }).save();
        console.log(newTech);
      }
    }

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: _id },
      {
        title: title,
        description: description,
        students: null,
        technologies: technologies,
        startDate: startDate,
        endDate: endDate,
        promotion: promotion,
      },
      { new: true }
    );
    console.log("######[" + JSON.stringify(updatedProject) + "]######:");

    return res.status(200).json({
      Message: "Project Updated suucessfully",
      Success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ValiderPFE_Enseignant = async (req, res) => {
  try {
    const { _id } = req.params;
    const teacher = req.user;

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: _id },
      {
        encadrant: teacher._id,
        project_life_cycle: "Pending_Validation",
      },
      { new: true }
    );
    console.log("######[" + JSON.stringify(updatedProject) + "]######:");

    return res.status(200).json({
      Message: "Project Updated successfully",
      Success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ValiderPFA_Responsibale = async (req, res) => {
  try {
    const { _id } = req.params;
    const responsible = req.user;

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: _id },
      {
        responsable: responsible._id,
        project_life_cycle: "Validated",
      },
      { new: true }
    );
    console.log("######[" + JSON.stringify(updatedProject) + "]######:");

    return res.status(200).json({
      Message: "Project Updated successfully",
      Success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ChoisirPFA_Student = async (req, res) => {
  try {
    const { _id } = req.params;
    const student = req.user;

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: _id },
      {
        students: student._id,
      },
      { new: true }
    );
    console.log("######[" + JSON.stringify(updatedProject) + "]######:");

    return res.status(200).json({
      Message: "Project Affected successfully",
      Success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const ValiderProjet_Admin = async (req, res) => {
  try {
    const { note } = req.body;
    const { _id } = req.params;
    let mention = "Ajourné";
    if (note < 10) {
      mention = "Ajourné";
    } else if (note >= 10 && note < 12) {
      mention = "Passable";
    } else if (note >= 12 && note < 14) {
      mention = "Assez bien";
    } else if (note >= 14 && note < 16) {
      mention = "Bien";
    } else if (note >= 16 && note < 18) {
      mention = "Trés bien";
    } else if (note > 18) {
      mention = "Excellent";
    }

    const updatedProject = await ProjectModel.findOneAndUpdate(
      { _id: _id },
      {
        project_life_cycle: "Validated",
        note: note,
        mention,
      },
      { new: true }
    );
    console.log("######[" + JSON.stringify(updatedProject) + "]######:");

    return res.status(200).json({
      Message: "Project Updated successfully",
      Success: true,
      data: updatedProject,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetPfeStudent = async (req, res) => {
  try {
    const student = req.user;

    const MyProjects = await ProjectModel.find({
      students: [student._id],
      type: "PFE",
    }).populate("encadrant");

    console.log("######[" + JSON.stringify(MyProjects) + "]######:");

    return res.status(200).json({
      Message: "Project created suucessfully",
      Success: true,
      data: MyProjects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetPFATeacher = async (req, res) => {
  try {
    const teacher = req.user;

    const MyProjects = await ProjectModel.find({
      encadrant: teacher._id,
      type: "PFA",
    }).populate("students");

    console.log("######[" + JSON.stringify(MyProjects) + "]######:");

    return res.status(200).json({
      Message: "PFA Projects retrieved successfully",
      Success: true,
      data: MyProjects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetProjectAll = async (req, res) => {
  try {
    const MyProjects = await ProjectModel.find({
      ...req.query,
    })
      .populate("students")
      .populate("encadrant");

    console.log("######[" + JSON.stringify(MyProjects) + "]######:");

    return res.status(200).json({
      Message: "Project retreaved suucessfully",
      Success: true,
      data: MyProjects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetSocietes = async (req, res) => {
  try {
    const Projects = await ProjectModel.find();

    const societes = [
      ...new Set(Projects.map((proj) => proj.societe.toLowerCase())),
    ];

    console.log("######[" + JSON.stringify(Projects) + "]######:");

    return res.status(200).json({
      Message: "les societes",
      Success: true,
      data: societes,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

/*
const GetPfaStudent = async (req, res) => {
  try {
    const student = req.user;

    const MyProjects = await ProjectModel.find({
      student: student._id,
      type: "PFA",
    }).populate("encadrant");

    console.log("######[" + JSON.stringify(MyProjects) + "]######:");

    return res.status(200).json({
      Message: "Project created suucessfully",
      Success: true,
      data: MyProjects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
*/
const GetStageStudent = async (req, res) => {
  try {
    const student = req.user;

    const MyProjects = await ProjectModel.find({
      students: [student._id],
      type: "STAGE",
    }).populate("encadrant");

    console.log("######[" + JSON.stringify(MyProjects) + "]######:");

    return res.status(200).json({
      Message: "Project created suucessfully",
      Success: true,
      data: MyProjects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const DeleteProject = async (req, res) => {
  try {
    const { _id } = req.params;
    const removedProject = await ProjectModel.deleteOne({ _id });
    if (!removedProject) {
      return res.status(400).json({ Message: "Failed to delete project" });
    }
    return res.status(200).json({ Message: "project deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetProjectsContainingTechnologies = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint retun list projects by given technologies '

  try {
    const listProjects = await ProjectModel.find({
      technologies: { $all: req.body.technologies },
    });
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: listProjects });
  } catch (error) {
    console.log("#####[ERROR]##### : ", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetProjectsByListTeachers = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint retun list projects teachers  '

  try {
    //list of projects containing all items if list teacher ids
    const listProjects = await ProjectModel.find({
      encadrants: { $all: req.body.teachers },
    });
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: listProjects });
  } catch (error) {
    console.log("#####[ERROR]##### : ", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllProjects = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'Endpoint retun all projects list '
  const { saison } = req.query;
  let filter = await filt_year_parser({}, saison);

  try {
    const Projects = await ProjectModel.find(filter);
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: Projects });
  } catch (error) {
    console.log("#####[ERROR]##### : ", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllPFA = async (req, res) => {
  try {
    const pfa = await ProjectModel.find({ type: "PFA", ...req.query })
      .populate("students")
      .populate("encadrant");
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: pfa });
  } catch (error) {
    console.log("#####[ERROR]##### : ", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const isAllowedToPick = async (req, res) => {
  try {
    const student = req.user;
    const this_year = new Date().getFullYear();
    const promotion = `${this_year - 1}-${this_year}`;

    const pfa = await ProjectModel.find({
      type: "PFA",
      students: [student._id],
      promotion: promotion,
    });
    let allowed = true;
    if (pfa.length !== 0) {
      allowed = false;
    }
    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: { allowed } });
  } catch (error) {
    console.log("#####[ERROR]##### : ", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllPFAStu = async (req, res) => {
  try {
    const pfa = await ProjectModel.find({ type: "PFA" })
      .populate("students")
      .populate("encadrant");

    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: pfa });
  } catch (error) {
    console.log("#####[ERROR]##### : ", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllPFAAdmin = async (req, res) => {
  try {
    const pfa = await ProjectModel.find({ type: "PFA" })
      .populate("students")
      .populate("encadrant");

    return res
      .status(200)
      .json({ Message: "Projects found successfully ", data: pfa });
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
  const { saison } = req.query;
  let filter = await filt_year_parser({ type }, saison);
  try {
    const Projects = await ProjectModel.find(filter);
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
    const project = await ProjectModel.findOne({ _id });
    if (project.nbr_students_max <= project.students.length) {
      //test of project max number of students reached
      return res
        .status(400)
        .json({ Message: "Student max number reached", data: null });
    }
    const affectStudent = await ProjectModel.findOneAndUpdate(
      { _id },
      {
        $push: {
          students: idStudentObj,
        },
      },
      { new: true } // return new project with update
    );
    if (!affectStudent) {
      return res.status(400).json({
        Message: "Failed to affect student to project",
        Success: false,
        data: affectStudent,
      });
    }
    return res
      .status(200)
      .json({ Message: "student affected successfully", data: affectStudent });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

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
    );
    if (!affectedTeacher) {
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
};

const validateProject = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'validation of a  project by responsable eitehr validation is true or false and giving double note'
  // #swagger.parameters['idProject'] = { description: 'project to validate' }
  // #swagger.parameters['note'] = { description: 'project note ( mention calculated based on note )' }

  const { idProject, note, isValidated } = req.params;
  var mention = "";
  switch (true) {
    case Math.trunc(note) <= 9:
      mention = "Ajourné";
      break;
    case Math.trunc(note) <= 11:
      mention = "Passable";
      break;
    case Math.trunc(note) <= 13:
      mention = "Assez bien";
      break;
    case Math.trunc(note) <= 15:
      mention = "Bien";
      break;
    case Math.trunc(note) <= 17:
      mention = "Trés bien";
      break;
    case Math.trunc(note) <= 20:
      mention = "Excellent";
      break;
    default:
      mention = "UNKOWN";
  }

  try {
    const _id = idProject;
    const affectedTeacher = await ProjectModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          isValidatedByReponsable: isValidated,
          note: note,
          mention: mention,
        },
      },
      { new: true } // return new project with update
    );
    if (!affectedTeacher) {
      return res.status(400).json({
        Message: "Failed to validate project",
        Success: false,
        data: false,
      });
    }
    return res.status(200).json({
      Message: "project validated successfully",
      data: affectedTeacher,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const getStatProjects = async (req, res) => {
  // #swagger.tags = ['Project apis']
  // #swagger.description = 'validation of a  project by responsable eitehr validation is true or false and giving double note'
  // #swagger.parameters['critere'] = { description: 'critere de groupement' }

  const { critere } = req.params;
  const stat = await ProjectModel.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "students",
        foreignField: "_id",
        as: "studentsList",
      },
    },
    { $match: { students: { $exists: true, $not: { $size: 0 } } } },
    //  {$unwind: '$studentsList'},

    {
      $group: {
        _id: `$${
          critere == "promotion"
            ? "studentsList.promotion"
            : critere == "technologie"
            ? "technologies"
            : "societe"
        }`,
        noteMoy: {
          $avg: "$note",
        },
      },
    },
  ]);
  return res.status(200).json({
    Message: "list not empty",
    Success: true,
    data: stat,
  });
};

module.exports = {
  CreateProject,
  CreatePFA,
  GetSocietes,
  GetProjectAll,
  GetAllProjectsByType,
  GetProjectsByListTeachers,
  AffectStudentToProject,
  AffectTeacherToProject,
  GetProjectsContainingTechnologies,
  validateProject,
  getStatProjects,
  GetPfeStudent,
  GetPFATeacher,
  GetAllProjects,
  GetStageStudent,
  UpdateMyProject,
  UpdatePFA,
  ValiderPFE_Enseignant,
  ValiderPFA_Responsibale,
  ValiderProjet_Admin,
  DeleteProject,
  GetAllPFA,
  ChoisirPFA_Student,
  GetAllPFAStu,
  GetAllPFAAdmin,
  isAllowedToPick,
};
