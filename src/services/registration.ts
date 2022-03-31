import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import * as queries from "../queries/queries"

export const registerService = async (req: Request, res: Response): Promise<Response> => {
    let { name, email, password, religion } = req.body

    const isRegistered = await queries.findUser(email)
    if (isRegistered) {
        return res.status(400).json({
            status: "failed",
            message: "email sudah terdaftar"
        })
    }

    const passwordHash: string = bcrypt.hashSync(password, 6)

    const result = await queries.createUser(name, email, passwordHash, religion)

    return res.status(201).json({
        status: "succes",
        message: "Registration Succesfully",
        data: result
    })
}
