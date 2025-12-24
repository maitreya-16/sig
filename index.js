import express from 'express'
import { userRouter } from './routes/users.js'
import { hash } from 'bcrypt'


const app = express()

app.use(express.json())

app.use("/user",userRouter)

app.get("/", (req, res) => {
    res.send("Hello world")
})


app.listen('3000', () => {
    console.log("Server Started on 3000...")
})




