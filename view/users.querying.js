import express from 'express';
import User from '../model/users.model.js'

const router = express.Router();

//search by name:-
router.get("/by-name",async(req,res)=>{
    try{
        const {name} = req.query
        const users = await User.find({
            name : {$regex:name , $options: "i"} //its means match the name from mongoDB and($options:"i") means match the case-sensitive words.
        }).select("-password") // its means mongoDB doesn't send password on response. 

        if(!users){
            return res.status(404).json({
                message:"No user found"
            })
        }

        res.status(200).json({
            message:"User found successfully",
            users
        })

    }catch(err){
        res.status(500).send(err.message)
    }
})


//search by role:-
router.get("/by-role",async(req,res)=>{
    try{
       const  {role} = req.query
       const users = await User.find({role}).select("-password")

       if(!users){
        return res.status(404).json({
            message:"no user found"
        })
       }

       res.status(200).json({
        message:"User found Successfully",
        users
       })

    }catch(err){
        res.status(500).send(err.message)
    }
})

//search by status:-
router.get("/by-status",async(req,res)=>{
    try{
        const {isActive} = req.query
        const user = await User.find({
            isActive : isActive === "true"
        }).select("-password")

        if(!user){
            return res.status(404).json({
                message:"No user found"
            })
        }

        res.status(200).json({
            message:"User found successfully",
            user
        })

    }catch(err){
        res.status(500).send(err.message)
    }
})

//pagination:-
router.get("/pagination",async(req,res)=>{
    try{

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 5

        const users = await User.find()
        .select("-password")
        .skip((page - 1)* limit)
        .limit(limit)

    res.status(200).json(users)

    }catch(err){
        res.status(500).send(err.message)
    }
})

export default router;