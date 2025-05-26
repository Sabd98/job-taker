import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

export const Request = sequelize.define("Request", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  status: {
    type: DataTypes.ENUM("pending", "accepted", "rejected"),
    defaultValue: "pending",
  },
  message: DataTypes.STRING
});

