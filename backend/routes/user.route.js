import { Router } from "express";
import { body } from "express-validator";
import { validate } from "../middleware/validate.js";
import ctrl from "../controllers/userController.js";

const router = Router();

const userValidation = [
  body("email").isEmail().withMessage("Email invalide"),
  body("firstName")
    .isString()
    .isLength({ min: 3 })
    .withMessage("Prénom requis (min. 3 caractères)"),
  body("phone")
    .isString()
    .isLength({ min: 10 })
    .withMessage("Téléphone requis (min. 10 chiffres)"),
  body("postalCode").matches(/^\d{5}$/),
];

router
  .get("/", ctrl.getAll) // Get all users associated to the connected user
  .get("/me", ctrl.get) // Get single user
  .post("/register-lead", validate(userValidation), ctrl.create) // Create a new user based on EligibilityCheck
  .post("/auth", ctrl.auth) // Authenticate user with email + otp or ecoRef code
  .put("subscribe", ctrl.subscribe) // Subscribe user to newsletter
  .put("/:id", validate(userValidation), ctrl.update) // Update user
  .delete("/:id", ctrl.delete); // Delete user

export default router;
