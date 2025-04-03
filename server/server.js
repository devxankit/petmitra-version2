import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import petsRoutes from "./routes/pets.js";
import adoptionsRoutes from "./routes/adoptions.js";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import Report from "./models/Report.js"; // Import the Report model

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: "10mb" })); // Parse JSON requests
app.use(cors());

// Use routes
app.use('/api/pets', petsRoutes);
app.use('/api/adoptions', adoptionsRoutes);
app.use('/api/reports', reportRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/Petmitra";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to PetMitra Database"))
  .catch((err) => console.error("Database connection error:", err));

// API to handle report submissions
app.post("/api/reports", async (req, res) => {
  try {
    const { images, description, issue, urgency, location } = req.body;

    // Debugging: Log the incoming request body
    console.log("Incoming Report Data:", req.body);

    // Validate request body
    if (!images || images.length === 0) {
      return res.status(400).json({ error: "Images are required" });
    }
    if (!description) {
      return res.status(400).json({ error: "Problem description is required" });
    }
    if (!issue) {
      return res.status(400).json({ error: "Issue type is required" });
    }
    if (!urgency) {
      return res.status(400).json({ error: "Urgency level is required" });
    }
    if (!location) {
      return res.status(400).json({ error: "Location is required" });
    }

    const newReport = new Report({
      images,
      description,
      issue,
      urgency,
      location,
    });
    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully!" });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ error: "Failed to submit report" });
  }
});

// API to fetch reports
app.get("/api/reports", async (req, res) => {
  try {
    const reports = await Report.find();
    res.status(200).json(reports);
  } catch (error) {
    console.error("Error fetching reports:", error);
    res.status(500).json({ error: "Failed to fetch reports" });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to PetMitra API");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));