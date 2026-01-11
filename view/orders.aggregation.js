import express from 'express';
import Order from  '../model/orders.model.js'

const router = express.Router()

// Order count by status:-
// GET /api/orders/agg/status-count
router.get("/agg/status-count", async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Total spending user-wise:-
// GET /api/orders/agg/user-spending
router.get("/agg/user-spending", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $match: { status: "delivered" } },
      {
        $group: {
          _id: "$userID",
          totalSpent: { $sum: "$totalAmount" },
          orders: { $sum: 1 },
        },
      },
      { $sort: { totalSpent: -1 } },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Top Selling Products:-
// GET /api/orders/agg/top-products
router.get("/agg/top-products", async (req, res) => {
  try {
    const result = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productID",
          totalQuantity: { $sum: "$items.quantity" },
          revenue: {
            $sum: {
              $multiply: ["$items.quantity", "$items.price"],
            },
          },
        },
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 10 },
    ]);

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;