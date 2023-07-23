import User from "../models/user";
import express, { Request, Response } from "express";
import { WhereOptions } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import auth from "../middlewares/auth";
import * as dotenv from "dotenv";
import client from "../config/redis";
import Slot from "../models/slot";
import Host from "../models/host";
import Property from "../models/prop";
dotenv.config();

const UserRouter = express.Router();

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  mobile: number;
  password: string;
}

//<<<<<<<<<<<<<<<<<<-------------to get users----------------->>>>>>>>>>>>>>>>

UserRouter.get("/", async (req, res) => {
  let users = await User.findAll();
  res.status(200).send(users);
});

//<<<<<<<<<<<<<<<<------------to create user-------------->>>>>>>>>>>>>>>>

UserRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, mobile, password } = req.body as UserAttributes;
  try {
    let data = await User.findOne({ where: { email } });

    if (data) {
      return res
        .status(200)
        .send({ msg: "user already registered please login" });
    }

    bcrypt.hash(password, 5, async function (err, hash) {
      if (err) {
        console.log(err.message);
        return res.status(404).send({ msg: "something went wrong", err });
      } else {
        console.log(hash);
        let user = User.build({
          name,
          email,
          mobile,
          password: hash,
        });
        await user.save();
        return res.status(201).send("user registered successfully");
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
});

//<<<<<<<<<<<<--------------login user ------------->>>>>>>>>>>>

UserRouter.post("/login", async (req: Request, res: Response) => {
  interface logindata {
    email: string;
    password: string;
  }

  let { email, password } = req.body as logindata;

  try {
    let user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).send({ msg: "user not found" });
    }

    // remember to check for id
    bcrypt.compare(password, user.dataValues.password, function (err, result) {
      if (result) {
        var token = jwt.sign(
          {userID:user.dataValues.id, email: user.dataValues.email },
          process.env.secret_key,
          { expiresIn: "2h" }
        );
        console.log(token);
        res
          .status(201)
          .send({ msg: "logi success", token, name: user.dataValues.name });
      } else {
        console.log(err);
        res.status(404).send({ mag: "Incorrect pasword" });
      }
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
});

// <<<<<<<<<<<<<-----------------logout user---------------------->>>>>>>>>>>>>>>>

UserRouter.get("/logout", auth, async (req: Request, res: Response) => {
  let token = req.body.token;

  await client.SADD("tokenBlacklist", token);

  res.send({ msg: "logout successful" });
});



//<<<<<<<<<<<<<----------------get slots------------------------>>>>>>>>>>>>


UserRouter.get("/slots",auth,async(req: Request, res: Response)=>{
let {userID}=req.body
  try {
    // {where:{userId:userID}}
    Slot.hasOne(Host, { foreignKey: 'hostId' });
    Slot.hasOne(Property, { foreignKey: 'propId' });


    let slots=await Slot.findAll({
      include:[Host,Property]
    })
    res.status(200).send({msg:"here is your booing",slots})
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ msg: error.message });
  }
})


//<<<<<<<<<<<----------------book slots---------------->>>>>>>>>>>>


UserRouter.patch("/slots/:slotId",auth,async(req: Request, res: Response)=>{
  let {userID}=req.body
  let slotId=req.params.slotId
    try {
      let slot=await Slot.update({userId:userID},{where:{id:slotId,userId:null,isAvailable:true}})
      res.status(201).send({msg:"slot booked succesfully",slot})
    } catch (error) {
      console.log(error.message);
      res.status(400).json({ msg: error.message });
    }
  })

//<<<<<<<<<<<<<<<------------to delete something--------------->>>>>>>>>>>>>>>>>

UserRouter.delete("/:id", async (req: Request, res: Response) => {
  let id = req.params.id;

  try {
    const whereClause: WhereOptions<UserAttributes> = {
      id: id as unknown as UserAttributes["id"],
    };
    let user = await User.destroy({
      where: whereClause,
    });

    res.status(200).send({ msg: "user is deleted", user });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ msg: "can't delete user", error });
  }
});

//<<<<<<<<<<---------------to update something--------------->>>>>>>>>>>>>>>

UserRouter.patch("/:id", async (req: Request, res: Response) => {
  let id = req.params.id;
  let data = req.body;
  try {
    const whereClause: WhereOptions<UserAttributes> = {
      id: id as unknown as UserAttributes["id"],
    };
    let user = await User.update(data, {
      where: whereClause,
    });

    res.status(201).send({ msg: "updation successful", user });
  } catch (error) {
    console.log(error.message);
    res.status(404).send({ msg: "can't update user", error });
  }
});

//<<<<<<<<<<<<<-----------delete a table----------->>>>>>>>>>>>>>>

UserRouter.delete("/delete/D", async (req: Request, res: Response) => {
  try {
    await User.drop();
    res.send("table is dropped");
  } catch (error) {
    res.send("can't drop a table");
  }
});
export default UserRouter;