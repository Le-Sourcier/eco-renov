import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import { authorize } from "../middleware/auth.js";
import ctrl from "../controllers/eligibilityController.js";

const router = Router();

const eligibilityValidation = [
  body("userStatus").isIn(["proprietaire", "locataire"]),
  body("housingType").isIn(["maison", "appartement"]),
  body("renovationType").isIn([
    "chauffage",
    "isolation",
    "fenetres",
    "multiple",
  ]),
  body("incomeLevel").isIn([
    "tres_modeste",
    "modeste",
    "intermediaire",
    "superieur",
  ]),
  // body("postalCode").matches(/^\d{5}$/),
];

router
  .get("/", authorize, ctrl.getAll) // Get all eligibility checks
  .get("/:id", authorize, ctrl.get) // Get single eligibility check
  .post("/", validate(eligibilityValidation), ctrl.create) // Create new eligibility check
  .put("/:id", authorize, validate(eligibilityValidation), ctrl.update) // Update eligibility check
  .delete("/:id", authorize, ctrl.delete); // Delete eligibility check

export default router;
