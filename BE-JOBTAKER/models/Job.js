import { DataTypes } from "sequelize";
import sequelize from "../utils/db.js";

export const Job = sequelize.define("Job", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  company: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  salary: {
    type: DataTypes.INTEGER,
  },
  desc: DataTypes.TEXT,
  skills: {
    type: DataTypes.ENUM("html", "css", "javascript"),
    // defaultValue: "html",
  },
  minimumExperience: DataTypes.INTEGER,
  minimumEducation: DataTypes.STRING,
  userId: {
    type: DataTypes.UUID, 
    allowNull: false,
  },
});

