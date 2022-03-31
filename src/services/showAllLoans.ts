import { Request, Response } from "express"
import * as queries from "../queries/queries"

export const showAllLoansService = async (req: Request, res: Response) => {
    const { email } = req.body
    

    const user = await queries.findUser(email)
    if (!user) {
        return res.status(400).json({
            status: "failed",
            message: "invalid credential"
        })
    }
    
    
    const id: number = user?.toJSON().id
    
    const loans = await queries.getAllLoans(id)
    
    return res.status(200).json({
        "status": "succes",
        "message": "get all loans succes",
        "data": loans
    })
}
