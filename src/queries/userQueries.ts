import { UserModel } from "../models/user";
require("../models/association/association")

class UserQueries {
    
    async findUser(email: string) {
        const result = await UserModel.findOne({
            where: {
                email
            }
        })
    
        return result
    }

    async createUser(name: string, email: string, password: string, religion: string) {
        const result = await UserModel.create({
            name,
            email,
            password,
            religion
        })
    
        return result
    }
}

export default UserQueries

// export const findUser = async (email: string) => {
//     const result = await UserModel.findOne({
//         where: {
//             email
//         }
//     })

//     return result
// }

// export const createUser = async (name: string, email: string, password: string, religion: string) => {
//     const result = await UserModel.create({
//         name,
//         email,
//         password,
//         religion
//     })

//     return result
// }