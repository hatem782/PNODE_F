const offerModel = require("../models/offer.model");

const Create = async (req, res) => {
  try {
    const { offerName, offerType, description, location } = req.body;

    const existoffer = await offerModel.findOne({ offerName, offerType });
    if (existoffer)
      return res.status(409).json({
        Message: "offer already exist",
        Success: false,
      });
    const newOffer = new offerModel(req.body);
    const createdOffer = await newOffer.save();
    return res.status(200).json({
      Message: "offer created suucessfully",
      Success: true,
      data: createdOffer,
    });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const Update = async (req, res) => {
  try {
    const { _id } = req.params;

    const { offerName, offerType, description, location } = req.body;

    const updateOffer = await offerModel.findOneAndUpdate(
      { _id },
      {
        $set: {
          offerName,
          offerType,
          description,
          location,
        },
      },
      { new: true }
    );
    if (!updateOffer) {
      return res.status(400).json({
        Message: "Failed to update offer",
        Success: false,
        data: updateoffer,
      });
    }
    return res
      .status(200)
      .json({ Message: "offer updated successfully", data: updateOffer });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const Delete = async (req, res) => {
  try {
    const { _id } = req.params;
    const removeoffer = await offerModel.deleteOne({ _id });

    if (!removeoffer) {
      return res.status(400).json({ Message: "Failed to delete offer" });
    }
    return res.status(200).json({ Message: "offer deleted successfully" });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAll = async (req, res) => {
  try {
    const offers = await offerModel.find();
    return res
      .status(200)
      .json({ Message: "offers found successfully ", data: offers });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetAllByType = async (req, res) => {
  try {
    const { offerType } = req.body;
    const offers = await offerModel.find({ offerType: offerType });
    return res
      .status(200)
      .json({ Message: "offers found successfully ", data: offers });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};

const GetOne = async (req, res) => {
  try {
    const { _id } = req.params;
    const offer = await offerModel.findOne({ _id });
    return res
      .status(200)
      .json({ Message: "offer found successfully ", data: offer });
  } catch (error) {
    console.log("##########:", error);
    res.status(500).send({ Message: "Server Error", Error: error.message });
  }
};
module.exports = { Create, Update, Delete, GetAll, GetAllByType, GetOne };
