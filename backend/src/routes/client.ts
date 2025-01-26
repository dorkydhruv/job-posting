import { Router } from "express";
import { Job } from "../model";

const router = Router();

router.get("/jobs", async (req, res) => {
  try {
    const jobs = await Job.find()
      .populate("company", "name email mobile")
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(jobs);
  } catch (err) {
    res.status(400).json({ error: "Failed to fetch jobs" });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie("jwt");
  res.json({ message: "Logout successful" });
});

export default router;
