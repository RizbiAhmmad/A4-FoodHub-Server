import express, { Application } from "express";
import cors from 'cors'


const app:Application = express();

app.use(cors({
    origin:process.env.APP_URL || "http://localhost:4000", //client side URL
    credentials:true
}))


app.use (express.json());
app.get ("/", (req,res)=>{
    res.send("Hello World!")
})


export default app