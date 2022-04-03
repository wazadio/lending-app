import { Request, Response } from "express";
import Joi, { ValidationResult } from "joi";
import { userServices } from "../services/userServices";
// import { loginService } from "../services/login";
// import { registerService } from "../services/registration";


class UserController {


    userLogin(req: Request, res: Response) {
        const { email, password } = req.body

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        })

        const validationResult: ValidationResult<any> = schema.validate({
            email: email,
            password: password
        })

        if (validationResult.error) {
            return res.status(400).json(validationResult)
        }

        userServices.login(req, res)
    }

    userRegister(req: Request, res: Response) {
        const { name, email, password, religion } = req.body

        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            name: Joi.string().required(),
            religion: Joi.string().required()
        })

        const validationResult: ValidationResult<any> = schema.validate({
            email: email,
            password: password,
            name: name,
            religion: religion
        })

        if (validationResult.error) {
            return res.status(400).json(validationResult)
        }

        userServices.register(req, res)

    }
}


export default new UserController



// const userLogin = (req: Request, res: Response) => {
//     const { email, password } = req.body

//     const schema = Joi.object({
//         email: Joi.string().email().required(),
//         password: Joi.string().required()
//     })

//     const validationResult: ValidationResult<any> = schema.validate({
//         email: email,
//         password: password
//     })

//     if (validationResult.error) {
//         return res.status(400).json(validationResult)
//     }

//     loginService(req, res)
// }


// const userRegister = async (req: Request, res: Response) => {
//     const { name, email, password, religion } = req.body

//     const schema = Joi.object({
//         email: Joi.string().email().required(),
//         password: Joi.string().required(),
//         name: Joi.string().required(),
//         religion: Joi.string().required()
//     })

//     const validationResult: ValidationResult<any> = schema.validate({
//         email: email,
//         password: password,
//         name: name,
//         religion: religion
//     })

//     if (validationResult.error) {
//         return res.status(400).json(validationResult)
//     }

//     registerService(req, res)

// }

// export default { userRegister, userLogin }