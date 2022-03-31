import express from 'express'
import loanController from "../controllers/loanController"
import userController from '../controllers/userController'
import { auth } from '../middlewares/auth'
const router = express.Router()


router.post('/borrower/registration', userController.userRegister)
router.post('/login', userController.userLogin)
router.post("/add", auth, loanController.addLoan)
router.post("/getLoans", auth, loanController.showLoans)

export = router