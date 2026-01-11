import express from 'express';
import isAuthenticated from "../middlewares/auth.middleware.js";
import { allProducts,singleProduct,createProduct,updateProduct,deleteProduct } from '../controller/products.controller.js';

const router = express.Router()

// PUBLIC ROUTES:-
//get all products:-
router.get("/products",allProducts)

//get a particular product using userName or id:-
router.get("/products/:name",singleProduct)

//  PROTECTED ROUTES (ADMIN OPTIONAL):-
//createProduct:-
router.post("/createProduct",  isAuthenticated,createProduct)

//updateProduct:-
router.patch("/updateProduct/:id", isAuthenticated,updateProduct)

//deleteProduct:-
router.delete("/deleteProduct/:name", isAuthenticated,deleteProduct)


export default router;