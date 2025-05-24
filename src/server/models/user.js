import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
  throw new Error("JWT_SECRET env var is required");
}
const User = sequelize.define(
  "Users",
  {
    id: {
      type: DataTypes.UUID,
      // defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    // password: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\d{5}$/,
      },
    },
    token: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
  },
  {
    hooks: {
      beforeValidate: (user, options) => {
        // If no id, generate one (though defaultValue usually does this)
        if (!user.id) {
          user.id = uuidv4();
        }

        // If no token yet, generate JWT now
        if (!user.token) {
          user.token = jwt.sign(
            {
              id: user.id,
              email: user.email, // note: email may be undefined until after validation, so ensure email is set on create
            },
            SECRET,
            { expiresIn: "30d" }
          );
        }
      },
      // beforeCreate: async (user) => {
      //   user.password = await bcrypt.hash(user.password, 10);
      // },
      // beforeUpdate: async (user) => {
      //   if (user.changed("password")) {
      //     user.password = await bcrypt.hash(user.password, 10);
      //   }
      // },
    },
  }
);

User.prototype.generateTokens = function () {
  const payload = {
    id: this.id, // identifiant du check (utile pour retrouver la ressource)
    email: this.email, // email du client (utile pour retrouver la ressource)
    postalCode: this.postalCode, // peut être utilisé pour des filtres
  };

  const accessToken = jwt.sign(payload, SECRET, {
    expiresIn: "2h",
  });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
};

export default User;
