import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  images: {
    type: [String],
    required: [true, "At least one image is required"],
  },
  description: {
    type: String,
    required: [true, "Problem description is required"],
    maxlength: [500, "Problem description cannot exceed 500 characters"],
  },
  issue: {
    type: String,
    required: [true, "Issue type is required"],
    enum: {
      values: ["Injured Animal", "Stray in Danger", "Abandoned Pet", "Animal Abuse"],
      message: "Invalid issue type",
    },
  },
  urgency: {
    type: String,
    required: [true, "Urgency level is required"],
    enum: {
      values: ["very urgent", "urgent", "not urgent"],
      message: "Invalid urgency level",
    },
  },
  location: {
    type: String,
    required: [true, "Location is required"],
    maxlength: [200, "Location cannot exceed 200 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Explicitly setting the collection name "reports"
const Report = mongoose.model("Report", reportSchema, "reports");

export default Report;