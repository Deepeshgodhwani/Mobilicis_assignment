const express = require("express");
const router = express();
const User = require("../model/users");
const { failureResponse, successResponse } = require("../utils/responseFormat");

router.get("/query1", async (req, res) => {
  try {
    let users = await User.find({
      $and: [
        { income: { $lt: "$5" } },
        { car: { $in: ["BMW", "Mercedes-Benz"] } },
      ],
    });
    return successResponse(res, "List of users", users);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

router.get("/query2", async (req, res) => {
  try {
    let users = await users.find({
      $and: [{ gender: "Male" }, { phone_price: { $gt: "10000" } }],
    });

    return successResponse(res, "List of users", users);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

router.get("/query3", async (req, res) => {
  try {
    let users = await User.find({
      $and: [
        { last_name: { $regex: /^M/ } },
        { $expr: { $gt: [{ quote: $size }, 15] } },
      ],
    });
    return successResponse(res, "List of users", users);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

router.get("/query4", async (req, res) => {
  try {
    let users = await User.find({
      $and: [
        { car: { $in: ["Mercedes-Benz", "BMW", "Audi"] } },
        { $email: { $not: { $regex: /^d/ } } },
      ],
    });

    return successResponse(res, "List of users", users);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

router.get("/query5", async (req, res) => {
  try {
    let users = await User.aggregate([]);
    return successResponse(res, "List of users", users);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

module.exports = router;
