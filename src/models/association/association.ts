import { UserModel } from "../user"
import { LoanModel } from "../loan"


UserModel.hasMany(LoanModel, {
    foreignKey: "user_id"
})

LoanModel.belongsTo(UserModel, {
    foreignKey: "user_id"
})