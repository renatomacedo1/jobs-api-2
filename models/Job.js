const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company name"],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    jobType: {
      type: String,
      enum: ["full-time", "part-time", "remote", "internship"],
      default: "remote",
    },
    jobLocation: {
      type: String,
      default: "my city",
      required: true,
    },
    experience: {
      type: String,
      enum: ["internship", "assistant", "junior", "mid-level", "senior"],
      default: "mid-level",
      required: true,
    },
    description: {
      type: String,
      default: "",
      required: true,
    },
    compensation: {
      type: Number,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", JobSchema);
