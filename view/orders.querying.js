import express from 'express'
import Order from '../model/orders.model.js'

const router = express.Router();



//Order according to amount range:-
// GET /api/orders/amount?min=500&max=5000
router.get("/amount", async (req, res) => {
  try {
    const { min, max } = req.query;

    const orders = await Order.find({
      totalAmount: {
        $gte: Number(min),
        $lte: Number(max),
      },
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Order of product:-
// GET /api/orders/product/:productId
router.get("/product/:productId", async (req, res) => {
  try {
    const orders = await Order.find({
      "items.productID": req.params.productId,
    });

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Pagination and Sorting:-
// GET /api/orders?page=1&limit=10
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;