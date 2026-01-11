import express from 'express'

import userRoutes from "./view/users.routes.js"
import productRoutes from "./view/products.routes.js"
import cartRoutes from "./view/carts.routes.js"
import orderRoutes from './view/orders.routes.js'


import userQueryRoutes from "./view/users.querying.js"
import productQueryRoutes from "./view/products.querying.js"
import cartQueryRoutes from './view/carts.querying.js'
import orderQueryRoutes from './view/orders.querying.js'


import userAggregateRoutes from './view/users.aggregation.js'
import productAggregateRoutes from './view/products.aggregation.js'
import orderAggregateRoutes from './view/orders.aggregation.js'




const app = express()
app.use(express.json())
import dotenv from 'dotenv'
dotenv.config()    

//mongoose code start here
import mongoose from 'mongoose'
const uri = process.env.MONGO_URI



// mongoose.connect() -> this method is used for connecting to the database:-
mongoose.connect(uri,
    {
dbName : "Ecommerce_users"
}
)
.then(()=>{
    console.log("connected to mongoDB")
})
.catch((err)=>{
    console.log(err.message)
})

//mongoose code ends here


app.get("/",(req,res)=>{
    res.send("welcome to our product management api")
})



// Normal CRUD Routes:-
app.use("/api/users",userRoutes) //for users
app.use("/api/products",productRoutes) //for products
app.use("/api/carts",cartRoutes) //for carts
app.use("/api/orders",orderRoutes) //for orders


//querying routes:-
app.use("/api/users/query",userQueryRoutes)
app.use("/api/products/query",productQueryRoutes)
app.use("/api/carts/query",cartQueryRoutes)
app.use("/api/orders/query",orderQueryRoutes)


//aggregation routes:-
app.use("/api/users/aggregate",userAggregateRoutes)
app.use("/api/products/aggregate",productAggregateRoutes)
app.use("/api/orders/aggregate",orderAggregateRoutes)

const PORT = process.env.PORT 
app.listen(PORT,()=>{
    console.log(`The server is live on ${PORT}`)
})