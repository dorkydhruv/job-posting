import express from "express";
import { authenticate, checkVerification } from "../middleware/auth";
import { Company, Job } from "../model";
import { sendVerificationEmail, sendJobAlert } from "../utils/email";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
const router = express.Router();
dotenv.config();
// Company Registration
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    const company = new Company({
      name,
      email,
      mobile,
      password: hashedPassword,
      verificationToken,
    });

    await company.save();
    await sendVerificationEmail(email, verificationToken);
    res.status(201).json({
      message: "Registration successful. Check email for verification.",
    });
  } catch (err) {
    res.status(400).json({ error: "Registration failed" });
  }
});

// Email Verification
router.get("/verify-email", async (req, res) => {
  try {
    const { token } = req.query;
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);

    const company = await Company.findOneAndUpdate(
      { email: (decoded as any).email, verificationToken: token },
      { $set: { emailVerified: true, verificationToken: null } },
      { new: true }
    );

    if (!company) {
      res.status(400).json({ error: "Invalid token" });
      return;
    }

    // auto-login
    const authToken = jwt.sign({ id: company._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });
    res.cookie("jwt", authToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    res.json({ response: true });
  } catch (err) {
    res.status(400).json({ error: "Verification failed" });
  }
});

// Company Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const company = await Company.findOne({ email });

  if (!company || !(await bcrypt.compare(password, company.password))) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign({ id: company._id }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  res.json({ message: "Login successful" });
});

// Job Posting
router.post("/jobs", authenticate, checkVerification, async (req, res) => {
  try {
    const job = new Job({
      ...req.body,
      company: req.company._id,
      endDate: new Date(req.body.endDate),
    });

    await job.save();

    // Send emails to candidates
    if (req.body.candidates?.length > 0) {
      await sendJobAlert(req.body.candidates, job, req.company);
    }

    res.status(201).json(job);
  } catch (err) {
    res.status(400).json({ error: "Job creation failed" });
  }
});

router.delete("/jobs/:id", authenticate, async (req, res) => {
  try {
    const job = await Job.findOneAndDelete({
      _id: req.params.id,
    });

    if (!job) {
      res.status(404).json({ error: "Job not found" });
      return;
    }

    res.json({ message: "Job deleted" });
  } catch (err) {
    res.status(400).json({ error: "Job deletion failed" });
  }
});

router.get("/my-jobs", authenticate, async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.company._id });
    res.json(jobs);
  } catch (err) {
    res.status(400).json({ error: "Job retrieval failed" });
  }
});

export default router;
