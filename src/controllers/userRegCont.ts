import { Request, Response } from "express";
import Joi, { ValidationResult } from "joi";
import { registerService } from "../services/registration";


const registerCtrl = async (req: Request, res: Response) => {
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

    registerService(req, res)

}

export default { registerCtrl }