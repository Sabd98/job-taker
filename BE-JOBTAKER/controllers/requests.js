import { User } from "../models/User.js";
import { Request } from "../models/Request.js";
import { Router } from "express";
import { employerMiddleware, authMiddleware } from "../utils/auth.js";
import { Job } from "../models/Job.js";

export const requestRouter = Router();

// requestRouter.get(
//   "/request/:id",
//   authMiddleware,
//   async (req, res) => {
//     try {
//       if (req.user.role === "employer") {
//         const jobs = await Job.findAll({
//           where: { userId: req.user.id },
//           attributes: ["id"],
//           raw: true,
//         });

//         if (jobs.length === 0) {
//           return res.json([]);
//         }
//         const jobIds = jobs.map((job) => job.id);

//         const applications = await Request.findAll({
//           where: { jobId: jobIds },
//           include: [Job, User],
//           order: [["createdAt", "DESC"]],
//         });
//         return res.json(applications);
//       }
//       else {
//         const requests = await Request.findAll({
//           include: [Job, User],
//           where: {
//             userId: req.user.id,
//           },
//           request: [["createdAt", "DESC"]],
//         });
//         res.json(requests);
//       }

//     } catch (error) {
//       res.status(500).json({
//         message: "Gagal mengambil riwayat lamaran",
//         error: error.message,
//       });
//     }

//   }
// );

requestRouter.get("/request", authMiddleware, async (req, res) => {
  try {

    if (req.user.role === "employer") {
      // Dapatkan semua job milik employer
      const jobs = await Job.findAll({
        where: { userId: req.user.id },
        attributes: ["id"],
      });


      if (jobs.length === 0) {
        return res.json([]);
      }

      const jobIds = jobs.map((job) => job.id);

      const requests = await Request.findAll({
        where: { jobId: jobIds },
        include: [
          {
            model: Job,
            attributes: ["title"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });


      // Format response
      const formattedRequests = requests.map((req) => ({
        id: req.id,
        title: req.Job ? req.Job.title : "No Title",
        message: req.message,
        status: req.status,
        jobId: req.jobId,
        createdAt: req.createdAt,
      }));

      return res.json(formattedRequests);
    } else {

      // Untuk job seeker
      const requests = await Request.findAll({
        where: { userId: req.user.id },
        include: [
          {
            model: Job,
            attributes: ["title"],
          },
        ],
        order: [["createdAt", "DESC"]],
      });


      // Format response
      const formattedRequests = requests.map((req) => ({
        id: req.id,
        title: req.Job ? req.Job.title : "No Title",
        message: req.message,
        status: req.status,
        jobId: req.jobId,
        createdAt: req.createdAt,
      }));

      return res.json(formattedRequests);
    }
  } catch (error) {
    console.error("Error fetching requests:", error);
    res.status(500).json({
      message: "Failed to fetch requests",
      error: error.message,
    });
  }
});

requestRouter.post("/request/:id", authMiddleware, async (req, res) => {
  const { jobId, message, userId } = req.body;
  const request = await Request.create({
    jobId,
    userId,
    message,
  });

  res.status(201).json(request);
});

requestRouter.put(
  "/request/:id",
  authMiddleware,
  async (req, res) => {
    const { status } = req.body;
    const request = await Request.findByPk(req.params.id);
    if (!request) return res.status(404).json({ message: "Request not found" });
    const job = await Job.findByPk(request.jobId);
    if (job.userId !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await request.update({
      status,
    });
    res.json(request);
  }
);
