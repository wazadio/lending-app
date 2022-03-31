import { Request, Response } from "express"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import * as redis from "redis"
import * as queries from "../queries/queries"

export const loginService = async (req: Request, res: Response): Promise<Response> => {
    const {email, password} = req.body

    const user = await queries.findUser(email)
    console.log(user)

    if (user) {
        // const validation = await bcrypt.compare(password, user.password)
        const verified = bcrypt.compareSync(password, user.toJSON().password)
        console.log(verified)
        if (verified) {
            const token: string = jwt.sign({
                id: user.toJSON().id,
                email: user.toJSON().email,
                name: user.toJSON().name,
                religion: user.toJSON().religion
            }, "pinjam_modal")

            const red_client = redis.createClient()
            red_client.connect()
            red_client.on('connect', function () {
                console.log('Connected!')
            })
            red_client.set(user.toJSON().email, token)
            // red_client.disconnect()

            return res.status(200).json({
                "status": "succes",
                "email": user.toJSON().email,
                "name": user.toJSON().name,
                "token": token
            })
        }
    }

    return res.status(400).json({
        "status": "failed",
        "message": "Invalid Credential"
    })

}
