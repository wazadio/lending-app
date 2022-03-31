import { NextFunction, Request, Response } from 'express';
import * as redis from "redis"

export const userAddLoanMidd = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    const { email } = req.body

    const token: string | string[] | undefined = req.headers["auth-token"]
    // console.log(token)

    const red_client = redis.createClient()
    red_client.connect()
    red_client.on('connect', function () {
        console.log('Connected!')
    })
    const aktif: string | null = await red_client.get(email)
    // console.log(aktif)

    if (aktif == token) {
        return next()
    }

    return res.status(401).json({
        "status": "failed",
        "message": "Unauthorized | Invalid token"
    })

}

