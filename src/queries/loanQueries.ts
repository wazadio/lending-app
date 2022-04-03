import { LoanModel } from "../models/loan";
require("../models/association/association")


class LoanQueries {

    async createLoan(user_id: number, jumlah: number) {
        const result = await LoanModel.create({
            user_id,
            jumlah
        })
    
        return result
    }

    async getAllLoans(user_id:number) {
        const result = await LoanModel.findAll({
            where: {
                user_id
            }
        })
    
        return result
    }
}

export default LoanQueries

// export const createLoan = async (user_id: number, jumlah: number) => {
//     const result = await LoanModel.create({
//         user_id,
//         jumlah
//     })

//     return result
// }

// export const getAllLoans =async (user_id:number) => {
//     const result = await LoanModel.findAll({
//         where: {
//             user_id
//         }
//     })

//     return result
// }


