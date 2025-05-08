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
  xname: {
    type: String,
    required: [true, "Name is required"],
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    maxlength: [10, "Phone number cannot exceed 1 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

// Explicitly setting the collection name "reports"
const Report = mongoose.model("Report", reportSchema, "reports");

export default Report;