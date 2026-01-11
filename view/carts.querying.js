import express from 'express';
import Cart from '../model/carts.model.js'

const router = express.Router();


// GET /cart/price?min=1000
export const getCartsByMinPrice = async (req, res) => {
  try {
    const min = Number(req.query.min);

    const carts = await Cart.find({
      totalPrice: { $gte: min },
    });

    res.status(200).json({ success: true, carts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export default router;