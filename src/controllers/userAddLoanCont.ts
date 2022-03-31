import { Request, Response } from 'express';
import Joi, { ValidationResult } from 'joi';
import { addLoanService } from '../services/addLoan';


const addLoan = async (req: Request, res: Response) => {
    const {email, jumlah} = req.body

    const schema = Joi.object({
        email: Joi.string().email().required(),
        jumlah: Joi.number().required()
    })

    const validationResult: ValidationResult<any> = schema.validate({
        email: email,
        jumlah: jumlah
    })

    if (validationResult.error) {
        return res.status(400).json(validationResult)
    }

    addLoanService(req, res)

}

export default {addLoan}