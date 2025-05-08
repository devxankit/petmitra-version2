import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import petsRoutes from "./routes/pets.js";
import adoptionsRoutes from "./routes/adoptions.js";
import reportRoutes from "./routes/reportRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import Report from "./models/Report.js";
import fetch from "node-fetch"; // Keep server active

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS Configuration (Restrict to Your Frontend)
app.use(cors({
  origin: ["https://petmitra-version2.onrender.com",
           "https://petmitra.vercel.app",
           "http://localhost:5173"],
  credentials: true
}));

app.use(express.json({ limit: "10mb" }));

// API Routes
app.use('/api/pets', petsRoutes);
app.use('/api/adoptions', adoptionsRoutes);
app.use('/api/reports', reportRoutes);
app.use("/api/auth", authRoutes);

// MongoDB Connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI is missing in .env");
  process.exit(1);
}

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Database connection error:", err));

// API to handle report submissions
app.post("/api/reports", async (req, res) => {
  try {
    const { images, description, issue, urgency, location, xname, phone } = req.body;
    if (!images?.length || !description || !issue || !urgency || !location || !xname || !phone) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Store base64 images directly in MongoDB
    const newReport = new Report({ 
      images, // Store base64 images directly in MongoDB
      description, 
      issue, 
      urgency, 
      location,
      xname,
      phone,
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

// Keep Server Alive (Prevent Cold Start)
setInterval(() => {
  fetch("https://petmitra-version2.onrender.com")
    .then(() => console.log("Keep-alive request sent"))
    .catch(err => console.error("Keep-alive request failed:", err));
}, 10 * 60 * 1000); // Every 10 minutes

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
