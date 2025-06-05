import User from "./user.js";
import EligibilityCheck from "./eligibilityCheck.js";

// Define relationships
User.hasMany(EligibilityCheck, {
  foreignKey: "user_id",
  as: "eligibilityCheck",
});

EligibilityCheck.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
export { User, EligibilityCheck };
