const SaisonModel = require("../models/saison.model");

const GetAllSaisons = async (req, res) => {
  try {
    const Saisons = await SaisonModel.find().sort({ title: "asc" });
    return res
      .status(200)
      .json({ Message: "Saisons found successfully ", data: Saisons });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const CreateSaison = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;

    const title = `${new Date(startDate).getFullYear()}-${new Date(
      endDate
    ).getFullYear()}`;

    const [a, b] = title.split("-");

    if (Number(b) - Number(a) !== 1) {
      console.log(Number(a) - Number(b));
      return res.status(409).json({
        Message: "saison invalide",
        Success: false,
      });
    }

    const existSaison = await SaisonModel.findOne({
      title,
    });
    if (existSaison)
      return res.status(409).json({
        Message: "you already created that saison univ",
        Success: false,
      });

    const newSaison = new SaisonModel({
      title,
      startDate,
      endDate,
    });
    const createdSaison = await newSaison.save();
    return res.status(200).json({
      Message: "saison created sucessfully",
      Success: true,
      data: createdSaison,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const UpdateSaison = async (req, res) => {
  try {
    const { _id } = req.params;
    const { startDate, endDate } = req.body;

    const title = `${new Date(startDate).getFullYear()}-${new Date(
      endDate
    ).getFullYear()}`;

    const [a, b] = title.split("-");

    if (Number(b) - Number(a) !== 1) {
      console.log(Number(a) - Number(b));
      return res.status(409).json({
        Message: "saison invalide",
        Success: false,
      });
    }

    console.log({ title, startDate, endDate });

    const updatedSaison = await SaisonModel.findOneAndUpdate(
      { _id },
      {
        startDate,
        endDate,
        title,
      },
      { new: true }
    );
    if (!updatedSaison) {
      return res.status(400).json({
        Message: "Failed to saison",
        Success: false,
      });
    }

    return res.status(200).json({
      Message: "saison created sucessfully",
      Success: true,
      data: updatedSaison,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

module.exports = {
  GetAllSaisons,
  CreateSaison,
  UpdateSaison,
};
