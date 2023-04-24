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
    let users = await User.find({
      $and: [
        { gender: "Male" },
        { $expr: { $gt: [{ $toInt: "$phone_price" }, 10000] } },
      ],
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
        { last_name: /^M/ },
        { $expr: { $gt: [{ $strLenCP: "$quote" }, 15] } },
        {
          $expr: {
            $regexMatch: { input: "$email", regex: "$last_name", options: "i" },
          },
        },
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
        { email: { $not: { $regex: /\d/ } } },
      ],
    });

    return successResponse(res, "List of users", users);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

router.get("/query5", async (req, res) => {
  try {
    let users = await User.aggregate([{
      $group: {
        _id: "$city",
        count: { $sum: 1 },
        avgIncome: { $avg: { $toDouble: { $substr: ["$income", 1, -1] } } },
      },
    },
    { $sort: { count: -1 } },
    { $limit: 10 }
  ]);
    return successResponse(res, "List of cities", users);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

module.exports = router;
