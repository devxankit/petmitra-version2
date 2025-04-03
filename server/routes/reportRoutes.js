import express from "express";
import Report from "../models/Report.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmailNotification } from "../utils/mailer.js";
import User from "../models/User.js"; // Import the User model to fetch registered users


const router = express.Router();

// Define __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility function to save base64 images to the server
const saveBase64Image = (base64String, folderPath) => {
  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 string");
  }

  const fileType = matches[1].split("/")[1]; // Extract file type (e.g., jpg, png)
  const base64Data = matches[2];
  const fileName = `${Date.now()}.${fileType}`;
  const filePath = path.join(folderPath, fileName);

  fs.writeFileSync(filePath, base64Data, "base64");
  return `/uploads/${fileName}`; // Return the relative path to the saved image
};

// Get the next case number
const getNextCaseNumber = async () => {
  const lastCase = await Report.findOne().sort({ caseNumber: -1 });
  return lastCase ? lastCase.caseNumber + 1 : 1;
};

// Handle form submission
router.post("/", async (req, res) => {
  try {
    const { images, issue, description, urgency, location } = req.body;

    // Validate required fields
    if (!images || images.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }
    if (!issue) {
      return res.status(400).json({ message: "Issue type is required" });
    }
    if (!description) {
      return res.status(400).json({ message: "Problem description is required" });
    }
    if (!urgency) {
      return res.status(400).json({ message: "Urgency level is required" });
    }
    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    // Save images to the server
    const folderPath = path.join(__dirname, "../../uploads");
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    const imagePaths = images.map((base64Image) =>
      saveBase64Image(base64Image, folderPath)
    );

    // Get the next case number
    const caseNumber = await getNextCaseNumber();

    // Create a new report
    const newReport = new Report({
      caseNumber,
      issue,
      description,
      urgency,
      location,
      images: imagePaths,
    });

    await newReport.save();
    
      // Fetch all registered user emails
      const users = await User.find({}, "email");
      const emailList = users.map((user) => user.email);
  
      // Send email notification
      const subject = "New Case Reported on PetMitra!";
      const message = `
        A new report has been submitted on the platform.
        Case Number: ${caseNumber}
        Issue: ${issue}
        Urgency: ${urgency}
        Location: ${location}
  
        Description:
        ${description}
  
        Please check the platform for further details.
      `;
  
      emailList.forEach((email) => {
        sendEmailNotification(email, subject, message);
      });
  
    res.status(201).json({ message: "Report submitted successfully", caseNumber });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ message: "Error submitting report", error: error.message });
  }
});

export default router;