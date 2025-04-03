import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ["user", "doctor", "organization"], default: "user" },
  phoneNumber: { type: String, required: true },
  organizationName: { type: String }
});

export default mongoose.model("User", userSchema);
