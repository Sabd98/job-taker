import { User } from "../models/User.js";
import sequelize from "../utils/db.js";
import bcrypt from "bcryptjs";

const usersData = [
  {
    name: "ThisCorp",
    email: "thiscorp@gmail.com",
    password: "TasTes8822",
    role: "employer",
  },
  {
    name: "AdbasSam",
    email: "adbas@gmail.com",
    password: "Tesss9811",
    role: "jobseeker",
  },
];

const seedUsers = async () => {
  try {
    await sequelize.sync();

    const hashedUsers = await Promise.all(
      usersData.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return {
          ...user,
          password: hashedPassword,
        };
      })
    );

    await User.bulkCreate(hashedUsers);
  } catch (error) {
    console.error("Error seeding users:", error);
  } finally {
    await sequelize.close();
  }
};

seedUsers();
