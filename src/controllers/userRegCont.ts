import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
const db = require("../../models")

const register = async (req: Request, res: Response): Promise<Response> => {
    let { name, email, password, religion } = req.body
    const passwordHash: string = bcrypt.hashSync(password, 6)
    console.log("PASSWORD = ", passwordHash)
    // password = passwordHash

    await db.user.create(
        {
            name, email, password: passwordHash, religion
        }
    )

    return res.status(201).json({
        "status": "succes",
        "message": "Regitration succesfully"
    })
}

export default {register}