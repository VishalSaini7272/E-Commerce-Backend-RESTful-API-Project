import express from 'express';
import isAuthenticated from "../middlewares/auth.middleware.js";
import {getCart,addToCart,updateCartItem,removeCartItem,clearAllCart} from '../controller/carts.controller.js'

const router = express.Router();

// APPLY AUTH TO ALL CART ROUTES
router.use(isAuthenticated);

//get the all carts:-
router.get("/cart",getCart) 

//create a cart:-
router.post("/cartAdd",addToCart)

//update item qty:-
router.put("/cartUpdate/:id",updateCartItem)

//remove item:-
router.delete("/cartDelete",removeCartItem)

//clear cart:-
router.delete("/cartAllClear",clearAllCart)



export default router;