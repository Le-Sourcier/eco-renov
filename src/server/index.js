import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

import sequelize from "./config/database.js";
// import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.route.js";
import eligibilityRoutes from "./routes/eligibility.route.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { authorize } from "./middleware/auth.js";

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.API_PORT || 3000;

// Load Swagger document
const swaggerDocument = YAML.load(join(__dirname, "swagger.yaml"));

// Basic rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Middleware
app.use(cors({ origin: "http://localhost:5173" })); // autorise Vite
app.use(helmet());
app.use(limiter);
app.use(express.json());

// API Documentation
app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
// app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", authorize, userRoutes);
// app.use("/api/v1/eligibility", authenticate, eligibilityRoutes);
app.use("/api/v1/eligibility", eligibilityRoutes);

// Error handling
app.use(errorHandler);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

// Initialize database and start server
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync database models
    await sequelize.sync({ alter: true, force: false });
    console.log("Database models synchronized.");

    app.listen(port, () => {
      console.log(`API server running on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
};

startServer();

export default app;
