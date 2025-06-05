import { User, EligibilityCheck } from "../models/index.js";
import serverMessage from "../utils/serverMessage.js";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";

const userController = {
  // Get all users associated to the connected user
  getAll: async (req, res, next) => {
    try {
      if (!req.user?.id) throw new Error("Utilisateur non authentifié");
      const users = await User.findAll({ where: { userId: req.user.id } });
      res.json(users);
    } catch (error) {
      next(error);
    }
  },

  // Get single user
  get: async (req, res, next) => {
    try {
      const id = req.user.id;
      if (!id) {
        return serverMessage(res, "UNAUTHORIZED_ACCESS");
      }
      const user = await User.findOne({ where: { id: id } });

      if (!user) {
        return serverMessage(res, "UNAUTHORIZED_ACCESS");
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },
  // Authenticate user
  auth: async (req, res, next) => {
    const { email, code, step } = req.body;

    try {
      let user;

      if (step === "request-otp" || step === "verify-otp") {
        // Email requis
        if (!email || typeof email !== "string" || !email.includes("@")) {
          return serverMessage(res, "INVALID_EMAIL");
        }

        user = await User.findOne({ where: { email } });
        if (!user) {
          return serverMessage(res, "USER_NOT_FOUND");
        }
      }

      switch (step) {
        // Étape 1 : Demande d’OTP
        case "request-otp": {
          const otp = user.generateOTP(); // ex: "123456"
          const hashedOtp = await bcrypt.hash(otp, 10);
          const otpExpiresAt = new Date(
            Date.now() + OTP_EXPIRATION_MINUTES * 60000
          );

          await user.update({
            otp: hashedOtp,
            otp_expires_at: otpExpiresAt,
          });

          await sendOTP(email, otp);
          return serverMessage(res, "OTP_SENT");
        }

        // Étape 2 : Vérification de l’OTP
        case "verify-otp": {
          if (!code || typeof code !== "string" || code.length !== 6) {
            return serverMessage(res, "INVALID_CODE_FORMAT");
          }

          if (
            !user.otp ||
            !user.otp_expires_at ||
            new Date() > new Date(user.otp_expires_at)
          ) {
            return serverMessage(res, "OTP_EXPIRED_OR_INVALID");
          }

          const isMatch = await bcrypt.compare(code, user.otp);
          if (!isMatch) {
            return serverMessage(res, "INVALID_OTP");
          }

          await user.update({ otp: null, otp_expires_at: null }); // Empêche la réutilisation de l'OTP

          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          return serverMessage(res, "AUTH_SUCCESS", { token });
        }

        // Étape 3 : Connexion par écoref
        case "verify-ecoref": {
          if (!code) {
            return serverMessage(res, "INVALID_CODE");
          }

          const ecoRef = await EligibilityCheck.findOne({
            where: { ref: code },
          });
          if (!ecoRef) {
            return serverMessage(res, "INVALID_ECOREF");
          }

          user = await User.findOne({ where: { id: ecoRef.user_id } });
          if (!user) {
            return serverMessage(res, "USER_NOT_FOUND");
          }

          const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
          });

          return serverMessage(res, "AUTH_SUCCESS", { token });
        }

        default:
          return serverMessage(res, "INVALID_STEP");
      }
    } catch (error) {
      console.error("Erreur dans auth-lead :", error);
      return serverMessage(res, "SERVER_ERROR");
    }
  },

  // Create a new user based on EligibilityCheck
  create: async (req, res, next) => {
    if (req.method !== "POST") {
      return serverMessage(res, "METHOD_NOT_ALLOWED");
    }

    try {
      const {
        email,
        firstName,
        phone,
        postalCode,
        acceptPhoneCall,
        acceptEmailing,
        acceptTerms,
      } = req.body;
      const id = req.user.id;

      // 1. Vérification de l'existence de l'utilisateur
      const user = await User.findByPk(id);
      if (!user) {
        return serverMessage(res, "PROFILE_NOT_FOUND");
      }

      // 2. Vérifier si l’email est déjà utilisé par un autre utilisateur
      const existingEmailUser = await User.findOne({
        where: {
          email,
          id: { [Op.ne]: id },
        },
      });

      if (existingEmailUser) {
        return serverMessage(res, "RESOURCE_CONFLICT");
      }

      // 3. Mise à jour de l'utilisateur
      await User.update(
        {
          email,
          firstName,
          phone,
          postalCode,
          acceptPhoneCall,
          acceptEmailing,
          acceptTerms,
        },
        { where: { id } }
      );

      const updatedUser = await User.findByPk(id);

      // 4. Regénérer le token JWT avec le nouvel email
      if (updatedUser) {
        const newToken = jwt.sign(
          { id: updatedUser.id, email: updatedUser.email },
          process.env.JWT_SECRET,
          { expiresIn: "30d" }
        );

        updatedUser.token = newToken;
        await updatedUser.save();
      }

      const ref = "ECO-" + id.slice(3, 5) + "-" + new Date().getFullYear();

      // 5. Mise à jour de l'entrée EligibilityCheck associée
      await EligibilityCheck.update(
        { postalCode, ref },
        { where: { user_id: id } }
      );

      const data = updatedUser.get();
      delete data.createdAt;
      delete data.updatedAt;

      return serverMessage(res, "SUCCESS", data);
    } catch (error) {
      console.error("Erreur dans register-lead :", error);
      return serverMessage(res, "SERVER_ERROR");
    }
  },
  // Subscribe to newsletter
  subscribe: async (req, res, next) => {
    try {
      const { email } = req.body;
      const id = req.user.id;
      const user = await User.findByPk(id);
      if (!user) {
        return serverMessage(res, "PROFILE_NOT_FOUND");
      }
      await user.update({ newsletter: true });
      return serverMessage(res, "SUCCESS");
    } catch (error) {}
  },
  // Update user
  update: async (req, res, next) => {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id,
          userId: req.user?.id,
        },
      });

      if (!user) {
        return res.status(404).json({
          error: "NotFound",
          message: "Utilisateur non trouvé",
        });
      }

      await user.update(req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  // Delete user
  delete: async (req, res, next) => {
    try {
      const result = await User.destroy({
        where: {
          id: req.params.id,
          userId: req.user?.id,
        },
      });

      if (!result) {
        return res.status(404).json({
          error: "NotFound",
          message: "Utilisateur introuvable",
        });
      }

      res.json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      next(error);
    }
  },
};

export default userController;
