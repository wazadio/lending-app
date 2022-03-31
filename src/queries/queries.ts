import { UserModel } from "../models/user";
import { LoanModel } from "../models/loan";
require("../models/association/association")

export const findUser = async (email: string) => {
    const result = await UserModel.findOne({
        where: {
            email
        }
    })

    return result
}

export const createUser = async (name: string, email: string, password: string, religion: string) => {
    const result = await UserModel.create({
        name,
        email,
        password,
        religion
    })

    return result
}

export const createLoan = async (user_id: number, jumlah: number) => {
    const result = await LoanModel.create({
        user_id,
        jumlah
    })

    return result
}

export const getAllLoans =async (user_id:number) => {
    const result = await LoanModel.findAll({
        where: {
            user_id
        }
    })

    return result
}


