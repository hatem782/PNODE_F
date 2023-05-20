const ProjectModel = require("../models/project.module");
const TechnoModel = require("../models/technologie.module");
const { filt_year_parser } = require("../functions/FiltYearParser");

const GetBySociete = async (req, res) => {
  try {
    const Projects = await ProjectModel.aggregate([
      {
        $match: { type: "PFE" },
      },
      {
        $group: {
          _id: { $toLower: "$societe" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1, // Sort by createdAt in descending order
        },
      },
    ]);

    console.log(Projects);

    return res.status(200).json({
      Message: "By Societe",
      Success: true,
      data: Projects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetByMention = async (req, res) => {
  try {
    const Projects = await ProjectModel.aggregate([
      {
        $match: { type: "PFE", note: { $gt: 0 } },
      },
      {
        $group: {
          _id: { $toLower: "$mention" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1, // Sort by createdAt in descending order
        },
      },
    ]);

    console.log(Projects);

    return res.status(200).json({
      Message: "By Mention",
      Success: true,
      data: Projects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetByPromotion = async (req, res) => {
  try {
    const Projects = await ProjectModel.aggregate([
      {
        $match: { type: "PFE" },
      },
      {
        $group: {
          _id: { $toLower: "$promotion" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1, // Sort by createdAt in descending order
        },
      },
    ]);

    console.log(Projects);

    return res.status(200).json({
      Message: "By promotion",
      Success: true,
      data: Projects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetByPays = async (req, res) => {
  try {
    const Projects = await ProjectModel.aggregate([
      {
        $match: { type: "PFE" },
      },
      {
        $group: {
          _id: { $toLower: "$pays" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1, // Sort by createdAt in descending order
        },
      },
    ]);

    console.log(Projects);

    return res.status(200).json({
      Message: "By pays",
      Success: true,
      data: Projects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetByEnseig = async (req, res) => {
  try {
    const Projects = await ProjectModel.find({ type: "PFE" }).populate(
      "encadrant"
    );

    let ensegs = Array.from(
      new Set(
        Projects.filter((proj) => {
          return proj.encadrant;
        }).map((proj) => {
          let { _id, firstName, lastName } = proj.encadrant;
          return JSON.stringify({
            _id,
            name: firstName + " " + lastName,
            nb: 0,
          });
        })
      ),
      JSON.parse
    );

    for (let i = 0; i < ensegs.length; i++) {
      let enseig = ensegs[i];
      let nb = (await ProjectModel.find({ type: "PFE", encadrant: enseig._id }))
        .length;
      ensegs[i].nb = nb;
    }

    return res.status(200).json({
      Message: "By encadrant",
      Success: true,
      data: ensegs,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetByTecho = async (req, res) => {
  try {
    const Projects = await ProjectModel.aggregate([
      {
        $match: { type: "PFE" },
      },
      {
        $unwind: "$technologies",
      },
      {
        $group: {
          _id: { $toLower: "$technologies" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: {
          _id: 1, // Sort by createdAt in descending order
        },
      },
    ]);

    console.log(Projects);

    return res.status(200).json({
      Message: "By Tech",
      Success: true,
      data: Projects,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GlobalPie = async (req, res) => {
  try {
    const Pending_Teacher = await ProjectModel.find({
      type: "PFE",
      project_life_cycle: "Pending_Teacher",
    });
    const Pending_Validation = await ProjectModel.find({
      type: "PFE",
      project_life_cycle: "Pending_Validation",
    });
    const Validated = await ProjectModel.find({
      type: "PFE",
      project_life_cycle: "Validated",
    });

    const data = [
      { text: "Attent Encad", value: Pending_Teacher.length },
      { text: "Attent valid", value: Pending_Validation.length },
      { text: "Validée", value: Validated.length },
    ];

    return res.status(200).json({
      Message: "By Tech",
      Success: true,
      data: data,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  GetBySociete,
  GetByTecho,
  GetByMention,
  GetByEnseig,
  GetByPromotion,
  GlobalPie,
  GetByPays,
};
