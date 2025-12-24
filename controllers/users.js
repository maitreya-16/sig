import { db } from '../src/index.js'
import { usersTable } from '../src/db/schema.js'
import { v4 as uuidv4 } from 'uuid';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcrypt'

const hashPassowrd = async (plaintext) => {
    return await bcrypt.hash(plaintext, 10)
}


export const createUser = async (req, res) => {
    try {
        const data = req.body

        if (!data.name || !data.password || !data.email) {
            return res.status(400).json({ "message": "Invalid data format" })
        }

        const hashedPassword = await hashPassowrd(data.password)


        await db.insert(usersTable).values({
            id: uuidv4(),
            name: data.name,
            email: data.email,
            password: hashedPassword
        })

        return res.status(201).json({ "message": "User created successfully" })

    } catch (error) {
        console.log("Error : ", error)
        return res.status(500).json({ "error": error })
    }
}
export const deleteUser = async (req, res) => {
    try {

        const id = req.params.id

        await db.delete(usersTable).where(eq(usersTable.id, id))

        return res.status(200).json({ "message": "User deleted successfully" })

    } catch (error) {
        console.log("Error : ", error)
        return res.status(500).json({ "error": error })
    }
}

export const getUser = async (req, res) => {
    try {

        const id = req.params.id

        const data = await db.select({
            name: usersTable.name,
            email: usersTable.email
        }).from(usersTable).where(eq(usersTable.id, id))

        return res.status(200).json({ "user": data[0] })

    } catch (error) {
        console.log("Error : ", error)
        return res.status(500).json({ "error": error })
    }

}

export const getUsers = async (req, res) => {
    try {

        const data = await db.select({
            name: usersTable.name,
            email: usersTable.email
        }).from(usersTable)

        return res.status(200).json({ "user": data })

    } catch (error) {
        console.log("Error : ", error)
        return res.status(500).json({ "error": error })
    }

}

export const updateUser = async (req, res) => {

    try {
        const id = req.params.id

        const name = req.body.name

        await db.update(usersTable).set({ name: name }).where(eq(usersTable.id, id))

        return res.status(200).json({ "message": "User updated succesfully" })

    } catch (error) {
        console.log("Error : ", error)
        return res.status(500).json({ "error": error })
    }
}


const comparePassword=async(userPassword,hash)=>{
    return await bcrypt.compare(userPassword,hash)
}
export const loginUser = async (req, res) => {
    try {

        const email = req.body.email
        const password = req.body.password
        if (!email || !password) {
            return res.status(400).json({"message":"Insufficient data of User"})
        }

        const data = await db.select().from(usersTable).where(eq(usersTable.email,email)) 

        const hash = data[0].password

        if(await comparePassword(password,hash)){
            return res.status(200).json({"message":"User Logged in"})
        }

        return res.status(400).json({"message":"Password doesnt match"})


    } catch (error) {
        console.log("Error : ", error)
        return res.status(500).json({ "error": error })
    }

}