const express = require("express");
const router = express.Router();
const saisonController = require("../controllers/saison.controller");
const VerifToken = require("../middlewares/VerifToken");
const SaisonValidation = require("../validations/saisonValidations");

// ################ SAISON ROUTES ################
router.get("/getall", saisonController.GetAllSaisons);

router.post(
  "/create",
  SaisonValidation.validationSaisonCreate,
  VerifToken.isAdmin,
  saisonController.CreateSaison
);

router.put(
  "/update/:_id",
  SaisonValidation.validationSaisonCreate,
  VerifToken.isAdmin,
  saisonController.UpdateSaison
);

module.exports = router;
