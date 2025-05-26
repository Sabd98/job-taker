import { User } from "../models/User.js";
import { Request } from "../models/Request.js";
import { Router } from "express";
import { adminMiddleware, authMiddleware } from "../utils/auth.js";
import { Job } from "../models/Job.js";
// import PDFDocument from "pdfkit";

export const requestRouter = Router();

requestRouter.get(
  "/request/:id",
  authMiddleware,
  async (req, res) => {
    try {
      if (req.user.role === "employer") {
        const jobs = await Job.findAll({
          where: { userId: req.user.id },
          attributes: ["id"],
          raw: true,
        });

        if (jobs.length === 0) {
          return res.json([]);
        }
        console.log(jobs,'isi job');
        const jobIds = jobs.map((job) => job.id);

        const applications = await Request.findAll({
          where: { jobId: jobIds },
          include: [Job, User],
          order: [["createdAt", "DESC"]],
        });
        console.log("app;", applications)
        return res.json(applications);
      }
      else {
        const requests = await Request.findAll({
          include: [Job, User],
          where: {
            userId: req.params.id,
          },
          request: [["createdAt", "DESC"]],
        });
        res.json(requests);
      }
    

    } catch (error) {
      res.status(500).json({
        message: "Gagal mengambil riwayat lamaran",
        error: error.message,
      });
    }

  }
);

requestRouter.post(
  "/request/:id",
  authMiddleware,
  async (req, res) => {
    const { jobId, message, userId } = req.body;
    console.log(req.body,req.body.id,'isi req')
    const request = await Request.create({
      jobId,
      userId,
      message,
    });

    res.status(201).json(request);
  }
);
