import express from "express"
import bodyParser from "body-parser"
import todoRoutes from "./routes/TodoRoutes"
import mongoose from "mongoose"
import cors from "cors"

const app = express()

app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET",'POST','PUT','DELETE'],
    credentials: true,
}))

app.use(bodyParser.json())
app.use("/", todoRoutes)


mongoose.connect("mongodb://localhost:27017/todoapp", (err) => {
    if (err) {
        console.log(err);
    }
    app.listen(5000, () => {
        console.log("Server runs in the port 5000....")
    })
})


