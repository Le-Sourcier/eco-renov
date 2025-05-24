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
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user) {
        return res.status(404).json({
          error: "NotFound",
          message: "Utilisateur introuvable",
        });
      }

      res.json(user);
    } catch (error) {
      next(error);
    }
  },

  // Create a new user based on EligibilityCheck
  create: async (req, res, next) => {
    if (req.method !== "POST") {
      return serverMessage(res, "METHOD_NOT_ALLOWED");
    }

    try {
      const { email, firstName, phone, postalCode } = req.body;
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
        { email, firstName, phone, postalCode },
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

      // 5. Mise à jour de l'entrée EligibilityCheck associée
      await EligibilityCheck.update({ postalCode }, { where: { user_id: id } });

      const data = updatedUser.get();
      delete data.createdAt;
      delete data.updatedAt;

      return serverMessage(res, "SUCCESS", data);
    } catch (error) {
      console.error("Erreur dans register-lead :", error);
      return serverMessage(res, "SERVER_ERROR");
    }
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
