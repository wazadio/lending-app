import express from 'express'
import reg_controller from '../controllers/userRegCont'
import log_controller from '../controllers/userLogCont'
import add_controller from "../controllers/userAddLoanCont"
import show_controller from "../controllers/userShowLoansConst"

// import { userRegMidd } from "../middlewares/userRegMidd"
import { userAddLoanMidd } from '../middlewares/userAddLoanMidd'
import { userShowLoansMidd } from '../middlewares/userShowLoansMidd'
const router = express.Router()


router.post('/borrower/registration', reg_controller.registerCtrl)
router.post('/login', log_controller.loginCtrl)
router.post("/add", userAddLoanMidd, add_controller.addLoan)
router.post("/getLoans", userShowLoansMidd, show_controller.showLoans)

export = router