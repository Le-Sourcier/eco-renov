import jwt from "jsonwebtoken";
// const db = require("../../models");

import rateLimit from "express-rate-limit";
import serverMessage from "../utils/serverMessage.js";

const unprotectedRoutes = [
  // "/api/user/login",
  // "/api/user/register",
  // "/api/user/refresh",
  // "/api/user/guest",
  // "/api/user/otp-login",
  // "/api/chat/send-message",
  "/api/v1/users/auth",
];
const authorize = async (req, res, next) => {
  // if (unprotectedRoutes.includes(req.originalUrl)) {
  //   return next(); // Pas besoin de JWT ici
  // }
  // console.log("REQUEST URL: ", req.originalUrl);

  const path = req.originalUrl.split("?")[0];
  if (unprotectedRoutes.includes(path)) {
    return next();
  }
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("FORBIDDEN_RESOURCE");
    return serverMessage(res, "FORBIDDEN_RESOURCE");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // const user = await db.Users.findByPk(decoded.id);
    // if (!user) {
    //   return serverMessage(res, "ACCOUNT_NOT_FOUND");
    // }

    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return serverMessage(res, "TOKEN_EXPIRED");
    }

    if (err.name === "JsonWebTokenError") {
      return serverMessage(res, "TOKEN_INVALID");
    }

    return serverMessage(res);
  }
};

// Middleware pour limiter les tentatives de login
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limite chaque IP à 5 requêtes par windowMs
  message: serverMessage(null, "TOO_MANY_ATTEMPTS"),
  standardHeaders: true, // renvoie les headers rate limit standard
  legacyHeaders: false, // désactive les X-RateLimit-* headers
});

export { authorize, loginLimiter };

// import jwt from "jsonwebtoken";
// import bcrypt from "bcryptjs";
// import { User } from "../models/index.js";

// export const authenticate = async (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     // Si un token est présent, on tente de le valider
//     if (authHeader) {
//       const token = authHeader.split(" ")[1];
//       try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({ where: { id: decoded.id } });
//         if (!user) {
//           return res.status(401).json({
//             error: "Unauthorized",
//             message: "Utilisateur introuvable",
//           });
//         }

//         req.user = user;
//         return next();
//       } catch (err) {
//         // return res.status(401).json({
//         //   error: "Invalid Token",
//         //   message: "Token invalide ou expiré",
//         // });
//       }
//     }

//     // Sinon, on tente une authentification par email/mot de passe
//     const { email, firstName, postalCode, phone } = req.body;
//     if (!email || !firstName || !postalCode || !phone) {
//       return res.status(400).json({
//         error: "Bad Request",
//         message: "Tous les champs sortants sont requis",
//       });
//     }

//     let user = await User.findOne({ where: { email } });

//     if (!user) {
//       // Créer un nouvel utilisateur avec mot de passe hashé
//       // const hashedPassword = await bcrypt.hash(password, 10);
//       user = await User.create({
//         email,
//         firstName,
//         postalCode,
//         phone,
//         email,
//         // password: hashedPassword,
//       });
//     } else {
//       // Vérifie le mot de passe
//       // const isMatch = await bcrypt.compare(password, user.password);
//       // if (!isMatch) {
//       //   return res.status(401).json({
//       //     error: "Unauthorized",
//       //     message: "Mot de passe incorrect",
//       //   });
//       // }
//     }

//     // Générer un token JWT et le renvoyer (optionnel ici)
//     const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//       expiresIn: "7d",
//     });

//     req.user = user;
//     req.token = token; // Peut être utile pour le renvoyer côté client
//     next();
//   } catch (error) {
//     console.error("❌ Erreur authenticate:", error);
//     return res.status(500).json({
//       error: "Server Error",
//       message: "Erreur interne d'authentification",
//     });
//   }
// };
