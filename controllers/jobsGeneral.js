const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");
const mongoose = require("mongoose");
const moment = require("moment");

const getAllJobsGeneral = async (req, res) => {
  const { search, jobType, experience, sort } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.position = { $regex: search, $options: "i" };
  }

  //   if (status && status !== "all") {
  //     queryObject.status = status;
  //   }

  if (jobType && jobType !== "all") {
    queryObject.jobType = jobType;
  }

  // experience added
  if (experience && experience !== "all") {
    queryObject.experience = experience;
  }

  let result = Job.find(queryObject);

  if (sort === "latest") {
    result = result.sort("-createdAt");
  }

  if (sort === "oldest") {
    result = result.sort("createdAt");
  }

  if (sort === "a-z") {
    result = result.sort("position");
  }

  if (sort === "z-a") {
    result = result.sort("-position");
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const jobs = await result;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

module.exports = { getAllJobsGeneral };
