import express from "express";
import User from "../model/users.model.js";

const router = express.Router();

//count by role:-
router.get("/count-by-role", async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: "$role",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//count by status:-
router.get("/status-count", async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $group: {
          _id: "$isActive",
          count: {
            $sum: 1,
          },
        },
      },
    ]);

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//sort by age:-(ascending order)
router.get("/sort", async (req, res) => {
  try {
    const users = await User.aggregate([
      {
        $sort: {
          age: 1,
        },
      },
      {
        $project:{
            password : 0 //hide password
        }
      }
    ]);

    res.status(200).json({
      users,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//aggregate pagination:-
router.get("/paginate", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const users = await User.aggregate([
      {
        $sort: {
          age: -1,
        },
      },
      {
        $skip: skip,
      },
      {
        $limit: limit,
      },
    ]);

    res.status(200).json({users});
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
