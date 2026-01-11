import express from 'express'
const router = express.Router();
import isAuthenticated from "../middlewares/auth.middleware.js";    
import { createOrder,getAllOrders, getOrderById, updateOrderStatus,deleteOrder} from '../controller/orders.controller.js'


// APPLY AUTH TO ALL ORDER ROUTES
router.use(isAuthenticated);


// CREATE ORDER
router.post("/createOrder",createOrder);

// GET ALL ORDERS
router.get("/getAllOrders", getAllOrders);

// GET SINGLE ORDER
router.get("/getOrderById/:id", getOrderById);

// UPDATE ORDER STATUS
router.put("/updateOrderStatus/:id", updateOrderStatus);

// DELETE ORDER
router.delete("/deleteOrder/:id",deleteOrder);


export default router;