import express from 'express'
import Product from '../model/products.model.js';
const router = express.Router();


router.get("/aggregate", async (req, res)=>{
    try{
    
        const products = await Product.aggregate(
            [
                {
                    $match:{
                        price:{
                            $exists:true
                        }
                    }
                },
                {
                    $group:{
                        _id:"$brand",
                        count:{
                            $sum:1
                        }
                    }
                },
                {
                    $sort:{
                        price:1
                    }
                }
            ]
        )

        res.json({
            products
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

// Aggregation Stages:-
// 1. $match : Filtering Documents
// this stage works exactly like the find() query, for filtering the data 

router.get('/match', async (req, res)=>{
    try{
        const pipeline = [
            // stage of pipeline
            {
                $match:{
                    price:{
                        $gt:2000
                    }
                }
            }
        ]

        const products = await Product.aggregate(pipeline)

        res.json({
            products
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})


// $sort - sorting documents:- 

router.get('/sort', async (req, res)=>{
    try{
        const products = await Product.aggregate([
            {
                $sort:{
                    price:-1
                }
            }
        ])

        res.json({
            products
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})


// $limit and $skip -> Pagination

router.get('/pagination', async (req, res)=>{
    try{    
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit ) || 5;

        const skip = (page-1)*limit;

        const products = await Product.aggregate([
            {
                $sort:{
                    price:-1
                }
            },
            {
                $skip:skip
            },
            {
                $limit:limit
            }
        ])
        res.json({
            products
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})

export default router;