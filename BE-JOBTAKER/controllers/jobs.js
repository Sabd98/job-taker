import { Job } from "../models/Job.js";
import { Router } from "express";
import {  authMiddleware } from "../utils/auth.js";

export const jobRouter = Router();


jobRouter.get("/job", async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

jobRouter.get("/job/:id", authMiddleware, async (req, res) => {
  try {
    console.log(req.params.id,'id');
    const job = await Job.findByPk(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

jobRouter.post(
  "/job",
  authMiddleware,
  async (req, res) => {
    try {
      const job = await Job.create({
        ...req.body,
      });
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);