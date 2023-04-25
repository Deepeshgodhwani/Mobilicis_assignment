const express = require("express");
const router = express();
const User = require("../model/users");
const { failureResponse, successResponse } = require("../utils/responseFormat");

// query1 : Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.

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

// query2 : Male Users which have phone price greater than 10,000.

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

//query3 : Users whose last name starts with “M” and has a quote character length greater than 15
// and email includes his/her last name.

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

//query4 : Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.

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

// query5 : Show the data of top 10 cities which have the highest number of users and their average income.

router.get("/query5", async (req, res) => {
  try {
    let users = await User.aggregate([
      {
        $group: {
          _id: "$city",
          count: { $sum: 1 },
          avgIncome: { $avg: { $toDouble: { $substr: ["$income", 1, -1] } } },
        },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    return successResponse(res, "List of cities", users);
  } catch (error) {
    return failureResponse(res, error.message, error);
  }
});

module.exports = router;
