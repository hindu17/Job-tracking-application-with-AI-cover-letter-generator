import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  company: String,
  role: String,
  description: String,
  status: {
    type: String,
    default: "Applied"
  },
   user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Job", jobSchema);