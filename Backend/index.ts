import express,{Request,Response} from "express";
import seq from "./config/db";
import * as dotenv from 'dotenv'
import UserRouter from "./controllers/user.route";
import HostRouter from "./controllers/host.route";
import propRouter from "./controllers/prop.route";
import cors from "cors"
dotenv.config()

const app = express();
app.use(cors({origin:"*"}))
app.use(express.json())
app.use("/user",UserRouter);
app.use("/host",HostRouter);

app.use("/host/prop",propRouter)


app.get("/",(req:Request,res:Response):void=>{
    res.send("welcome to StayHub")
})


seq.sync().then(()=>{
    app.listen(process.env.PORT,():void=>{
        // connection.connect()
               console.log(`connected at port ${process.env.PORT}`);
        
    })
})