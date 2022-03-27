import { Request, Response } from 'express';
const db = require("../../models")

const addLoan = async (req: Request, res: Response): Promise<Response> => {
    const {email, jumlah} = req.body
    
    const user = await db.user.findOne({
        where: {
            email: email
        }
    })

    const id = user.id

    const loan = await db.Loan.create(
        {
            user_id: id, jumlah
        }
    )

    return res.status(201).json({
        "status": "succes",
        "message": "loan added",
        "data": loan
    })

}

export default {addLoan}