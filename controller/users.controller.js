import User from "../model/users.model.js";
import {hashPassword} from '../utils/hash.js'
import { comparePassword } from "../utils/hash.js";
import { generateToken } from "../utils/jwt.js";


//all users:-
const users = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
    return  res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched Successfully",
      users,
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


//single user by id:-
const singleUserById = async (req, res) => {
  try {
    const { id } = req.params;
    
     const user = await User.findById(id);
    

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      user
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


//single user by name:-
const singleUserByName = async(req,res)=>{
    try{
        const {name} = req.params;
        const user = await User.findOne({name})

        if(!user){
            return res.status(404).json({
                message:"No user found"
            })
        }

        res.status(200).json({
            message:"User fetched successfully",
            user
        })

    }catch(err){
        res.status(500).send(err.message)
    }
}
 
//login user:-
const login = async(req,res)=>{
    try{
        const {email,password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                      message: "Email and password are required"
            })
        }

        const user = await User.findOne({email}).select("+password");

        if(!user){
          return  res.status(404).json({
                 message: "User not found"
            })
        }

        // if(user.password !== password){
        //     return res.status(401).json({
        //         message:"Invalid Password"
        //     })
        // }

          const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password",
      });
    }

    const token = generateToken(user);

        res.status(200).json({
            message:"Successfully login",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            },
            token
        })

    }catch(err){
        res.status(500).send(err.message)
    }
}



//signup user:-
const signup = async(req,res)=>{
        try {
        const { name, email, password } = req.body

        //  Basic validation
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "Name, email and password are required"
            })
        }

        //  Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists with this email"
            })
        }

        
    const hashedPassword = await hashPassword(password);
        //  Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        //  Success response
        res.status(201).json({
            message: "User registered successfully",
             user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        })

    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}




//update user:-
const reset = async(req, res) => {
 try{
    const{id} = req.params
    const{name,phone} = req.body;

    if(!name && !phone){
        return res.status(400).json({
            message:"Nothing to update"
        })
    }

    const updateUser = await User.findByIdAndUpdate(
        id,
        {name,phone},
        {new: true}
    )

    if(!updateUser){
        return res.status(404).json({
            message:"no user found"
        })
    }

    res.status(200).json({
        message:"User Update Successfully",
        user:{
            id:updateUser._id,
            name:updateUser.name,
            email:updateUser.email,
            phone:updateUser.phone,
            role:updateUser.role
        }
    })

 }catch(err){
    res.status(500).send(err.message)
 }
};

//logout user:-
const logout = (req, res) => {
 try{
  res.status(200).json({
            message: "Logout successfully"
        })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}


export { users, singleUserById, singleUserByName, login, signup, logout, reset };
