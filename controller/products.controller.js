    import Product from "../model/products.model.js"

    //get all products:-
    const allProducts = async (req,res)=>{
        try{
            const products = await Product.find();
            if(!products){
                res.status(404).json({
                    message :"products not found"
                })
            }
    res.status(200).json({
        message :"Product fetched",
        products
    })

        }catch(err){
            res.status(500).send(err.message)
        }

        
    }

 //get single product:-
    const singleProduct = async (req,res)=>{
        try{
            const {name} = req.params;
            const product = await Product.findOne({
                name : { $regex : `^${name}$`, $options: "i"}
            })

            if(!product){
                res.status(404).json({
                    message:"Product not found"
                })
            }

            res.status(200).json({
                message:"Product fetched successfully"
            })


        }catch(err){
            res.status(500).send(err.message)
        }

    
    }
 
    //create product:-
    const createProduct = async (req,res)=>{
        try{
            let productData = req.body;
            // const product = new Product(productData)  //this step implements the validation on the data
            // await product.save(); //send the data to the db
        const product = await Product.create(productData)
            res.status(200).json({
                message:"Product create successfully",
                product
            })

        }catch(err){
            res.status(500).send(err.message)
        }
    }


    //update product:-

    const updateProduct = async(req,res)=>{
        try{
            const {id,name} = req.params;
            const updateData = req.body;
            const product = await Product.findByIdAndUpdate(
                id,
                name,
                updateData,
                {
                    new : true,   // updated data and new data return 
                    runValidators :true // schema validations apply
                }
            
            );


            if(!product){
                res.status(404).json({
                    message:"Product is not found"
                })
            }

            res.status(200).json({
                message :"Product updated successfully"
            })

        }catch(err){
            res.status(500).send(err.message)
        }


    }


    //delete product:-
        const deleteProduct = async (req,res)=>{
        try{
        const {name} = req.params;
        const product = await Product.findOneAndDelete({

            name : { $regex : `^${name}$`, $options: "i"}
        });

        if(!product){
            res.status(404).json({
                message : "product is not found"
            })
        }

        res.status(200).json({
            message :"Product delete successfully"
        })

    }catch(err){
        res.status(500).send(err.message)
    }
    }

    // const login = async (req,res)=>{
    //     try{
    //         //login = email and password 
    //         const {email,password} = req.body;
    //         if(typeof email !== 'string'){
    //             return res.send("No scripts allowed")
    //         }

    //         const product = await Product.findOne({email:email}).select('+password')
    //         if(!password){
    //             res.status(404).json({
    //                 message:"product not found"
    //             })
    //         }

    //         if(product.password !== password){
    //             res.status(400).json({
    //                 message :"Password dosn't match"
    //             })
    //         }

    //     }catch(err){
    //         res.status(500).send(err.message)
    //     }
    // }


    // const logout = (req,res)=>{
    //     res.send("This is the logout route")
    // }

    // const reset = (req,res)=>{
    //     res.send("This is the reset route")
    // }
    export {
        allProducts,
        singleProduct,
        createProduct,
        updateProduct,
        deleteProduct
    }