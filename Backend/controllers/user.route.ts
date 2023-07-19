import User from "../models/user";
import  express,{Request,Response}  from "express";

const UserRouter = express.Router();

interface UserAttributes {
    name: string;
    email: string;
    mobile: number;
    password: string;
  }
UserRouter.get("/",async(req,res)=>{
    let users = await User.findAll()
    res.send(users)
})
UserRouter.post("/register",async(req:Request,res:Response)=>{

const {name,email,mobile,password}=req.body as UserAttributes;
try {

    let user = User.build({
        name,
        email,
        mobile,
        password 
      })
      await user.save()
      res.send("user registered successfully")
    
} catch (error) {
    
    console.log(error.message);
    res.status(400).json({"msg":error.message})
}
})

export default UserRouter;