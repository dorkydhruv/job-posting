import mongoose, { Schema } from "mongoose";

const CompanySchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobile: { type: String, required: true },
  password: { type: String, required: true },
  emailVerified: { type: Boolean, default: false },
  verificationToken: String,
});

const JobSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  experienceLevel: {
    type: String,
    enum: ["BEGINNER", "INTERMEDIATE", "EXPERT"],
    required: true,
  },
  candidates: [String],
  endDate: { type: Date, required: true },
  company: { type: Schema.Types.ObjectId, ref: "Company" },
});

export const Company = mongoose.model("Company", CompanySchema);
export const Job = mongoose.model("Job", JobSchema);
