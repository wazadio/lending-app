import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import * as EmailValidator from 'email-validator'
import Joi, { ValidationResult } from 'joi';
const db = require("../../models")


const isDataComplete = (email: string, name: string, password: string, religion: string): ValidationResult<any> => {
    const lengkap: boolean = (name != undefined && email != undefined && password != undefined && religion != undefined)
    const cekData: object = {
        email: email,
        password: password,
        name: name,
        religion: religion
    } 

    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        name: Joi.string().required(),
        religion: Joi.string().required()
    })

    return schema.validate(cekData)

    // if (lengkap) {

    //     return [true, ""]

    // } else {
    //     let pesan = ""
    //     if (name == undefined) {
    //         pesan += "name,"
    //     }
    //     if (email == undefined) {
    //         pesan += "email,"
    //     }
    //     if (password == undefined) {
    //         pesan += "password,"
    //     }
    //     if (religion == undefined) {
    //         pesan += "religion,"
    //     }
    //     return [false, pesan += " tidak boleh kosong"]
    // }
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

const register = async (req: Request, res: Response): Promise<Response> => {
    let { name, email, password, religion } = req.body
    let message: any

    const dataComplete: ValidationResult<any> = isDataComplete(email, name, password, religion)
    console.log(dataComplete)
    if (!dataComplete.error) {
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
            "message": dataComplete.error
        }
    }


    return res.status(400).json(message)

    // const passwordHash: string = bcrypt.hashSync(password, 6)
    // console.log("PASSWORD = ", passwordHash)
    // // password = passwordHash

    // await db.user.create(
    //     {
    //         name, email, password: passwordHash, religion
    //     }
    // )

    // return res.status(201).json({
    //     "status": "succes",
    //     "message": "Regitration succesfully"
    // })
}

export default { register }