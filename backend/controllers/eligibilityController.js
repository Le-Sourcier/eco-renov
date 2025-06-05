import { EligibilityCheck, User } from "../models/index.js";
import { v4 as uuidv4 } from "uuid";
import serverMessage from "../utils/serverMessage.js";

const eligibility = {
  // Get all eligibility checks
  getAll: async (req, res, next) => {
    try {
      const eligibilityChecks = await EligibilityCheck.findAll({
        where: { userId: req.user.id },
      });
      return serverMessage(res, eligibilityChecks);
    } catch (error) {
      // next(error);
      return serverMessage(res);
    }
  },

  // Get single eligibility check
  get: async (req, res, next) => {
    try {
      const eligibilityCheck = await EligibilityCheck.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.id,
        },
      });

      if (!eligibilityCheck) {
        // return res.status(404).json({
        //   error: "Not found",
        //   message: "Eligibility check not found",
        // });
        return serverMessage(res, "RESOURCE_NOT_FOUND");
      }

      return serverMessage(res, "SUCCESS", eligibilityCheck);
    } catch (error) {
      // next(error);
      return serverMessage(res);
    }
  },

  // Create new eligibility check
  create: async (req, res, next) => {
    try {
      // if(req.body)
      // First create fack user account
      const fakeUserId = uuidv4();
      const fakeEmail = `guest_${fakeUserId}@fake.local`;
      // Generate  fake random  postal code
      const postalCode = Math.floor(Math.random() * 90000) + 10000;

      const tempUser = await User.create({
        id: fakeUserId,
        email: fakeEmail,
        firstName: "Invité",
        phone: null,
        postalCode: postalCode,
      });

      const eligibilityData = {
        ...req.body,
        user_id: tempUser.id,
        isEligible: calculateEligibility(req.body),
        estimatedAmount: calculateAmount(req.body),
      };

      const user = await EligibilityCheck.create(eligibilityData);

      const data = {
        accessToken: tempUser.token,
        userStatus: user.userStatus,
        housingType: user.housingType,
        renovationType: user.renovationType,
        incomeLevel: user.incomeLevel,
        isEligible: user.isEligible,
        estimatedAmount: user.estimatedAmount,
        postalCode: user.postalCode,
      };
      return serverMessage(res, "SUCCESS", data);
    } catch (error) {
      next(error);
      return serverMessage.error("Error creating eligibility check:", error);
    }
  },

  // Update eligibility check
  update: async (req, res, next) => {
    try {
      const eligibilityCheck = await EligibilityCheck.findOne({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });

      if (!eligibilityCheck) {
        // return res.status(404).json({
        //   error: "Not found",
        //   message: "Eligibility check not found",
        // });

        return serverMessage(res, "RESOURCE_NOT_FOUND");
      }

      const updateData = {
        ...req.body,
        isEligible: calculateEligibility(req.body),
        estimatedAmount: calculateAmount(req.body),
      };

      await eligibilityCheck.update(updateData);
      return serverMessage(res, eligibilityCheck);
    } catch (error) {
      // next(error);
      return serverMessage(res);
    }
  },
  // Delete eligibility check
  delete: async (req, res, next) => {
    try {
      const result = await EligibilityCheck.destroy({
        where: {
          id: req.params.id,
          userId: req.user.id,
        },
      });

      if (!result) {
        // return res.status(404).json({
        //   error: "Not found",
        //   message: "Eligibility check not found",
        // });
        return serverMessage(res, "RESOURCE_NOT_FOUND");
      }

      return serverMessage(res, "RESOURCE_HAS_BEEN_DELETED_SUCCESSFULLY");
    } catch (error) {
      // next(error);
      return serverMessage(res);
    }
  },
};

// Helper functions
const calculateEligibility = (data) => {
  // Simple eligibility logic - expand based on real requirements
  if (data.userStatus === "proprietaire") return true;
  if (data.userStatus === "locataire" && data.renovationType === "chauffage")
    return true;
  return false;
};

const calculateAmount = (data) => {
  let baseAmount = 0;

  // Base amount by renovation type
  switch (data.renovationType) {
    case "chauffage":
      baseAmount = 2500;
      break;
    case "isolation":
      baseAmount = 3000;
      break;
    case "fenetres":
      baseAmount = 1500;
      break;
    case "multiple":
      baseAmount = 4500;
      break;
  }

  // Adjust by income level
  switch (data.incomeLevel) {
    case "tres_modeste":
      baseAmount *= 1.5;
      break;
    case "modeste":
      baseAmount *= 1.2;
      break;
    case "intermediaire":
      baseAmount *= 0.8;
      break;
    case "superieur":
      baseAmount *= 0.5;
      break;
  }

  // Adjust by housing type
  if (data.housingType === "maison") {
    baseAmount *= 1.2;
  }

  return Math.round(baseAmount);
};

export default eligibility;
