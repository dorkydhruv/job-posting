import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import CompanyRouter from "./routes/company";
import ClientRouter from "./routes/client";
// Load environment variables from .env file
dotenv.config();

// Create an Express application
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

// Health check endpoint
app.get("/health", (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: "OK",
    timestamp: Date.now(),
    mongoConnection:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
  };

  try {
    res.status(200).json(healthcheck);
  } catch (error) {
    healthcheck.message = `Failed with error: ${error}`;
    res.status(503).json(healthcheck);
  }
});

app.use(CompanyRouter);
app.use(ClientRouter);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
