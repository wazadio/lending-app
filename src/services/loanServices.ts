import { Request, Response } from "express"
import LoanQueries from "../queries/loanQueries"
import UserQueries from "../queries/userQueries"

// const loanQueries = new LoanQueries
// const userQueries = new UserQueries

class LoanServices {

    public loanQueries: LoanQueries
    public userQueries: UserQueries

    constructor() {
        this.userQueries = new UserQueries
        this.loanQueries = new LoanQueries
    }

    async addLoan(req: Request, res: Response) {
        const { email, jumlah } = req.body
    
        const user = await this.userQueries.findUser(email)
        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "invalid credential"
            })
        }
        
        
        const id: number = user?.toJSON().id
        
        const loan = await this.loanQueries.createLoan(id, jumlah)
        
        return res.status(201).json({
            "status": "succes",
            "message": "loan added",
            "data": loan.toJSON()
        })
    }

    async showAllLoans(req: Request, res: Response) {
        const { email } = req.body
        
    
        const user = await this.userQueries.findUser(email)
        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "invalid credential"
            })
        }
        
        
        const id: number = user?.toJSON().id
        
        const loans = await this.loanQueries.getAllLoans(id)
        
        return res.status(200).json({
            "status": "succes",
            "message": "get all loans succes",
            "data": loans
        })
    }
}

export const loanServices = new LoanServices