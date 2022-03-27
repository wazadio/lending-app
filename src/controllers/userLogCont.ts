import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import * as redis from "redis"
const db = require("../../models")

const login = async (req: Request, res: Response): Promise<Response> => {
    let { email, password } = req.body

    if (email && password) {

        const user = await db.user.findOne({
            where: {
                email: email
            }
        })

        if (user) {
            // const validation = await bcrypt.compare(password, user.password)
            const verified = bcrypt.compareSync(password, user.password)
            console.log(verified)
            if (verified) {
                const token: string = jwt.sign({
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    religion: user.religion
                }, "pinjam_modal")
                
                const red_client = redis.createClient()
                red_client.connect()
                red_client.on('connect', function () {
                    console.log('Connected!')
                })
                red_client.set(user.email, token)
                // red_client.disconnect()

                return res.send({
                    "status": "succes",
                    "email": user.email,
                    "name": user.name,
                    "token": token
                })
            }
        }

        return res.status(400).json({
            "status": "failed",
            "message": "User not found"
        })
    }

    return res.status(400).json({
        "status": "failed",
        "message": "Data kurang lengkap"
    })
}

export default {login}