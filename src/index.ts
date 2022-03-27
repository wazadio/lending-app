import express, { Application } from "express"
import routes from "./routes/routes"

class App {
    public app: Application

    constructor() {
        this.app = express()
        this.plugins()
    }

    protected plugins(): void {
        this.app.use(express.json())
        this.app.use("/", routes)
    }


}

const port: number = 3000
const app = new App().app
app.listen(port, () => {
    console.log("started")
})
