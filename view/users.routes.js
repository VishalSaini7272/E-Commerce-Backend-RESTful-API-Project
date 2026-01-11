import express from 'express'
import { users, signup, logout, reset, login, singleUserById, singleUserByName } from '../controller/users.controller.js';

const router = express.Router()



//signup
router.post("/signup", signup)

//login
router.post("/login", login)

//reset password
router.put("/reset", reset)

//logout
router.get("/logout", logout)

//get all users
router.get("/users", users)

//get a specific user through id 
router.get("/users/id/:id", singleUserById)

//get a specific user through name
router.get("/users/name/:name", singleUserByName)

export default router;