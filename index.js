import express from 'express'
import {db} from './src/index.js'
import { usersTable } from './src/db/schema.js'
import { v4 as uuidv4 } from 'uuid';

const app = express()

app.use(express.json())

function helloworld(req,res){
    res.send("Hello 123 world")
}

app.get("/",helloworld);

async function createUser(req,res){
    try {
        const data = req.body
        
        if(!data.name||!data.password||!data.email){
            return res.status(400).json({"message":"Invalid data format"})
        }
        
        await db.insert(usersTable).values({
            id:uuidv4(),
            name:data.name,
            email:data.email,
            password:data.password
        })

        return res.status(201).json({"message":"User created successfully"})

    } catch (error) {
        console.log("Error : ",error)
        return res.status(500).json({"error":error})
    }
}
//user creation 
app.post("/user",createUser)

app.listen('3000',()=>{
            console.log("Server Started on 3000...")
        })