import { Request, Response } from "express";
import Joi, { ValidationResult } from "joi";
import { loginService } from "../services/login";


const loginCtrl = (req: Request, res: Response) => {
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

    loginService(req, res)
}

export default { loginCtrl }