const db = require("../../models")
import * as EmailValidator from 'email-validator'
import { Request, Response, NextFunction } from 'express';


const isDataComplete = (email: string, name: string, password: string, religion: string): Array<boolean | string> => {
    const lengkap: boolean = name != undefined && email != undefined && password != undefined && religion != undefined
    if (lengkap) {
        return [true, ""]

    } else {
        let pesan = ""
        if (name == undefined) {
            pesan += "name,"
        }
        if (email == undefined) {
            pesan += "email,"
        }
        if (password == undefined) {
            pesan += "password,"
        }
        if (religion == undefined) {
            pesan += "religion,"
        }
        return [false, pesan += " tidak boleh kosong"]
    }
}


const isEmailValid = (email: string): boolean => {
    if (EmailValidator.validate(email) == false) {
        console.log("email not valid")
        return false
    }

    return true
}


const isRegistered = async (email: string): Promise<boolean> => {
    const user = await db.user.findOne({ where: { email: email } })

    if (user !== null) {
        return true
    } else {
        return false
    }
}

export const userRegMidd = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    let { name, email, password, religion } = req.body
    let message: any

    const dataComplete: Array<boolean | string> = isDataComplete(email, name, password, religion)
    if (dataComplete[0]) {
        console.log(1)
        if (isEmailValid(email)) {
            console.log(2)
            const registered = await isRegistered(email)
            if (registered) {
                console.log(3)
                message = {
                    "status": "failed",
                    "message": "email already registered"
                }
            } else {
                return next()
            }
        } else {
            console.log(4)
            message = {
                "status": "failed",
                "message": "email not valid"
            }
        }
    } else {
        console.log(5)
        message = {
            "status": "failed",
            "message": dataComplete[1]
        }
    }


    return res.status(400).json(message)
}