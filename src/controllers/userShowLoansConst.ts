import { Request, Response } from 'express';
const db = require("../../models")

const showLoans = async (req: Request, res: Response): Promise<Response> => {
    const {email, jumlah} = req.body
    
    const user = await db.user.findOne({
        where: {
            email: email
        }
    })

    const id = user.id

    const loans = await db.Loan.findAll({
        where: {
            user_id: id
        }
    }
    )

    return res.status(201).json({
        "status": "succes",
        "data": loans
    })

}

export default {showLoans}