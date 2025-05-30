import { Job } from "../models/Job.js";
import { User } from "../models/User.js";
import sequelize from "../utils/db.js";


const seedJobs = async () => {
  try {
    await sequelize.sync();

    const employer = await User.findOne({
      where: { role: "employer" },
    });

    if (!employer) {
      throw new Error("Tidak ada employer terdaftar");
    }

    // 2. Definisikan jobs dengan userId employer
    const jobsData = [
      {
        title: "Fullstack .Net",
        company: "PT A",
        location: "Bandung",
        category: "Fullstack",
        salary: 2000000,
        minimumExperience: 1,
        minimumEducation: "Bachelor",
        desc: "deskripsi satu",
        skills: ["html", "css"],
        userId: employer.id,
      },
      {
        title: "Fullstack MERN",
        company: "PT B",
        location: "Jakarta",
        category: "Fullstack",
        salary: 3000000,
        minimumExperience: 1,
        minimumEducation: "Bachelor",
        desc: "deskripsi 2",
        skills: ["javascript", "react"],
        userId: employer.id,
      },
    ];
    await Job.bulkCreate(jobsData);
  } catch (error) {
    console.error("Error seeding jobs:", error);
  } finally {
    await sequelize.close();
  }
};

seedJobs();
