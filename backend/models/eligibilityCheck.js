import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const EligibilityCheck = sequelize.define("EligibilityChecks", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: "Users",
      key: "id",
    },
  },
  ref: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userStatus: {
    type: DataTypes.ENUM("proprietaire", "locataire"),
    allowNull: false,
  },
  housingType: {
    type: DataTypes.ENUM("maison", "appartement"),
    allowNull: false,
  },
  renovationType: {
    type: DataTypes.ENUM("chauffage", "isolation", "fenetres", "multiple"),
    allowNull: false,
  },
  incomeLevel: {
    type: DataTypes.ENUM(
      "tres_modeste",
      "modeste",
      "intermediaire",
      "superieur"
    ),
    allowNull: false,
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      is: /^\d{5}$/,
    },
  },
  isEligible: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  estimatedAmount: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

export default EligibilityCheck;
