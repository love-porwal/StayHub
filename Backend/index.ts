import express,{Request,Response} from "express";
import seq from "./config/db";
import * as dotenv from 'dotenv'
import UserRouter from "./controllers/user.route";
dotenv.config()

const app = express();
app.use(express.json())
app.use("/user",UserRouter);

app.get("/",(req:Request,res:Response):void=>{
    res.send("welcome to StayHub")
})


seq.sync().then(()=>{
    app.listen(process.env.PORT,():void=>{
        // connection.connect()
               console.log(`connected at port ${process.env.PORT}`);
        
    })
})