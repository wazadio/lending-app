import express, { Application, Request, Response } from "express"
import * as EmailValidator from 'email-validator'
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import * as redis from "redis"
const db = require("../models")

class App {
    public app: Application
    public response: {
        status: string,
        message: string | number
    }

    constructor() {
        this.app = express()
        this.response = {
            status: "",
            message: ""
        }
        this.plugins()
        this.routes();
    }

    protected plugins(): void {
        this.app.use(express.json())
    }

    protected routes(): void {
        this.app.route("/").get((req: Request, res: Response) => {
            res.send("hi")
        })

        this.app.route("/borrower/registration").post(
            async (req: Request, res: Response): Promise<Response> => {
                let { name, email, password, religion } = req.body
                const cek: string | number = this.dataChecker(name, email, password, religion)

                if (cek == 0) {
                    const user = await db.user.findOne({ where: { email: email } })
                    const user2 = await db.user.findOne({ where: { email: email } })
                    // console.log(user)
                    // console.log(user2)
                    if (user !== null) {
                        this.response = {
                            status: "failed",
                            message: "Email has been used"
                        }
                        return res.send(this.response)
                    }

                    const passwordHash: string = bcrypt.hashSync(password, 6)
                    console.log("PASSWORD = ", passwordHash)
                    // password = passwordHash

                    const createUser = await db.user.create(
                        {
                            name, email, password: passwordHash, religion
                        }
                    )
                    this.response = {
                        status: "succes",
                        message: "Register Successfully"
                    }
                    return res.send(this.response)
                } else {
                    this.response = {
                        status: "failed",
                        message: cek
                    }
                    return res.send(this.response)
                }
            })

        this.app.route("/login").post(
            async (req: Request, res: Response): Promise<Response> => {
                let { email, password } = req.body

                if (email && password) {

                    const user = await db.user.findOne({
                        where: {
                            email: email
                        }
                    })

                    if (user) {
                        // const validation = await bcrypt.compare(password, user.password)
                        const verified = bcrypt.compareSync(password, user.password)
                        console.log(verified)
                        if (verified) {
                            const token: string = jwt.sign({
                                id: user.id,
                                email: user.email,
                                name: user.name,
                                religion: user.religion
                            }, "pinjam_modal")
                            
                            const red_client = redis.createClient()
                            red_client.connect()
                            red_client.on('connect', function () {
                                console.log('Connected!')
                            })
                            red_client.set(user.email, token)
                            // red_client.disconnect()

                            return res.send({
                                "email": user.email,
                                "name": user.name,
                                "token": token
                            })
                        }
                    }

                    return res.send("User not found")
                }

                return res.send("Data kurang lengkap")
            }
        )

    }

    dataChecker(name: string, email: string, password: string, religion: string): string | number {
        const lengkap: boolean = name != undefined && email != undefined && password != undefined && religion != undefined
        if (lengkap) {
            if (EmailValidator.validate(email) == false) {
                console.log("email not valid")
                return "Email not valid"
            }

            return 0

        } else {
            let pesan = ""
            if (name == undefined) {
                pesan += "name,"
            }
            if (email == undefined) {
                pesan += "email,"
            }
            if (password == undefined) {
                pesan += "password,"
            }
            if (religion == undefined) {
                pesan += "religion,"
            }
            return pesan += " tidak boleh kosong"
        }
    }

    // isRegistered(email: string): boolean {
    //     async ():Promise<boolean> => {
    //         const user = await db.user.findOne({ where: { email: email } })
    //         return user
    //     }
    //     if (user !== null) return true
    //     else return false
    // }

}

const port: number = 3000
const app = new App().app
app.listen(port, () => {
    console.log("started")
})

// const app = express()

// app.route("/").get((req, res) => {
//     res.send("hi")
// })

// app.listen(3000)