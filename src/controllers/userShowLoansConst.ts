import { Request, Response } from 'express';
import Joi, { ValidationResult } from 'joi';
import { showAllLoansService } from '../services/showAllLoans';

const showLoans = async (req: Request, res: Response) => {
    const {email} = req.body
    
    const schema = Joi.object({
        email: Joi.string().email().required()
    })

    const validationResult: ValidationResult<any> = schema.validate({
        email: email,
    })

    if (validationResult.error) {
        return res.status(400).json(validationResult)
    }

    showAllLoansService(req, res)

}

export default {showLoans}