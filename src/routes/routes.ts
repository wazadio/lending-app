import express from 'express'
import userControllers from '../controllers/userControllers'
import loanControllers from '../controllers/loanControllers'
// import loanController from "../controllers/loanControllers"
// import userController from '../controllers/userControllers'
import { auth } from '../middlewares/auth'
const router = express.Router()


router.post('/borrower/registration', userControllers.userRegister)
router.post('/login', userControllers.userLogin)
router.post("/add", auth, loanControllers.addLoan)
router.post("/getLoans", auth, loanControllers.showLoans)

export = router