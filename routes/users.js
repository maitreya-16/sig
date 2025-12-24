import express from 'express'
import { createUser,updateUser,getUser,getUsers,deleteUser,loginUser } from '../controllers/users.js'

const userRouter = express.Router()

userRouter.post("/",createUser)
userRouter.get("/:id",getUser)
userRouter.put("/:id",updateUser)
userRouter.delete("/:id",deleteUser)
userRouter.get("/",getUsers)
userRouter.post("/login",loginUser)

export {userRouter}