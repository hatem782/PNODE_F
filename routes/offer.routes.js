const express = require("express");
const router = express.Router();
const offerController = require("../controllers/offer.controller");
const verifToken = require("../middlewares/VerifToken");
const offerValidation = require("../validations/offer.validation");
// aluminie

router.post(
  "/create",
  verifToken.isAluminie,
  offerValidation.createOfferValidation,
  offerController.Create
);

router.delete("/delete/:_id", verifToken.isAluminie, offerController.Delete);

router.put(
  "/update/:_id",
  verifToken.isAluminie,
  offerValidation.createOfferValidation,
  offerController.Update
);

router.get("/getAll", verifToken.isUser, offerController.GetAll);
router.get("/GetAllByIdOwner", verifToken.isAluminie, offerController.GetAllByIdOwner);

router.get(
  "/getAllByType",
  verifToken.isAluminie,
  offerController.GetAllByType
);

router.get("/getOne/:_id", verifToken.isAluminie, offerController.GetOne);
module.exports = router;
