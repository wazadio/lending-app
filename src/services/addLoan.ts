import { Request, Response } from "express"
import * as queries from "../queries/queries"

export const addLoanService = async (req: Request, res: Response) => {
    const { email, jumlah } = req.body

    const user = await queries.findUser(email)
    if (!user) {
        return res.status(400).json({
            status: "failed",
            message: "invalid credential"
        })
    }
    
    
    const id: number = user?.toJSON().id
    
    const loan = await queries.createLoan(id, jumlah)
    
    return res.status(201).json({
        "status": "succes",
        "message": "loan added",
        "data": loan.toJSON()
    })
}
