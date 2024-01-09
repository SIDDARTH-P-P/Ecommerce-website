import express from "express";
import cors from "cors";
const app = express();
import dotenv from "dotenv";
import path from "path";
import router from "./router.js";
import connect_DB from "./connect.js";
dotenv.config()
app.use(cors());
app.use(express.json({ limit: "25mb" }))
app.use(express.static("./dist"))

app.use("/api",router)

app.post("/api/login",(req,res)=>{
    console.log(req.body);
})

app.get("/*", (req, res) => {
    return res.sendFile(path.resolve("./dist/index.html"))
})

connect_DB().then(()=>{
    app.listen(process.env.VITE_PORT, (error) => {
        if (error) {
            console.log(error);
        }
        console.log("Server Start");
    })
})
.catch((error)=>{
    console.log(error);
})