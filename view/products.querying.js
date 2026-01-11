import express from 'express'
const router = express.Router();
import Product from '../model/products.model.js';

//QUERYING IN MONGODB
//matching query = when we want to find documents with the input queries

router.get("/productName",async(req,res)=>{
    try{
        const {name} = req.query

            const products = await Product.find({
                name : { $regex:name,$options:"i"}
            })

            if(products.length ===0){
                return res.status(404).json({
                    message:"product not found"

                })
            }
            res.status(200).json({
                message: "products fetched successfully",
                products
            })
        

    }catch(err){
        res.status(500).send(err.message)
    }
})


router.get("/greaterThan/:value",async(req,res)=>{
    try{
        const priceValue = Number(req.params.value)

        const products = await Product.find({
            price:{
                $gt:priceValue
            }
        })

        if(!products){
            res.status(404).json({
                message:"Product not found"

            })
        }

        res.status(200).json({
            message:"Products fetched successfully",
            products
        })

    }catch(err){
        res.status(500).send(err.message)
    }
})


router.get("/PriceBetween/:min/:max",async(req,res)=>{
    try{
const minPrice = Number(req.params.min)
const maxPrice = Number(req.params.max)

   if (isNaN(minPrice) || isNaN(maxPrice)) {
            return res.status(400).json({
                message: "Min and Max price must be numbers"
            });
        }

const products = await Product.find({
price:{
    $gte:minPrice,
    $lte:maxPrice
}

})

if(products.length===0){
         return   res.status(404).json(
                {message:"no product found"})
            }
            res.status(200).json(products)
    }catch(err){
        res.status(500).json({
            message : err.message
            })
        
    }
})


// select allows you to select and show only the fields that are required
// .select -->('field1 field2') it will only include these fields
router.get("/all_products", async(req,res)=>{
    try{

        const products = await Product.find()
        .sort({
            price : 1
        })
        .skip(2)
        .limit(5) 
        .select('name price brand') 

        res.status(200).json({
            message:"Product fetched successfully",
            products
        })

    }catch(err){
        res.status(500).json({
            message : err.message
            })
        
    }
})


//UPDATE QUERIES:-
// (Update through name):-

router.put("/ChangeProductName",async(req,res)=>{
    try{
const {productName,newProductName} = req.body;
const updatedProduct = await Product.findOneAndUpdate(
    {
        productName :productName
    },
    {
        $set:{
            productName:newProductName
        }
    },
    {
        new:true  //new:true means, when we do update, always give old data. but, if we are using new:true so, the updated field will also give to us.
    }
)
res.status(200).json({
    message:"products update successfully",
    updatedProduct

})(updatedProduct)
    }catch(err){
        res.status(500).json({
            message : err.message
            })
        
    }
})

// DELETE QUERIES:-
// (delete by id):-
 router.delete("/deleteProduct/:id",async(req,res)=>{
    try{
        const {id} = req.params
        const product = await Product.findByIdAndDelete(id)
        
        if(!product){
            return res.status(404).json({
                message:"No product found"
            })
        }

        res.status(200).json({
            message:"Product deleted successfully",
            product
        })
    }catch(err){
        res.status(500).send(err.message)
    }
})

// (delete by name):-
router.delete("/deleteProduct/:name",async(req,res)=>{
    try{
        const {name} = req.query

        if(!name){
            return res.status(400).json({
                message:"Name is required"
            })
        }

        const product = await Product.findOneAndDelete({
            name: {$regex:name, $options:"i"} 
            }).select("-password")

            if(!product){
                return res.status(404).json({
                    message:"No product found"
                })
            }

            res.status(200).json({
                message:"Product found successfully",
                product
            })
            
    }catch(err){
        res.status(500).send(err.message)
    }
})


//pagination means --> How many pages are comes in one page on single time.
router.get("/pagination", async (req, res)=>{
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit) ||10;
        const skip = (page-1)*limit;

        const products = await Product.find().skip(skip).limit(limit)

        res.status(200).json({
            products
        })
    }
    catch(err){
        res.status(500).send(err.message)
    }
})



export default router;