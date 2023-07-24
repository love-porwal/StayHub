import User from "../models/user";
import express, { Request, Response } from "express";
import { WhereOptions } from "sequelize";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import auth from "../middlewares/auth";
import * as dotenv from "dotenv";
import client from "../config/redis";
import Property from "../models/property";
import Host from "../models/host";
import Slot from "../models/slot";
// import authorise from "../middlewares/authorize";
dotenv.config();

const propRouter = express.Router();

propRouter.post("/property", auth, async (req: Request, res: Response) => {
  let { name, address, price, type, availableroom, userID } = req.body;
  try {
    let prop = Property.build({
      name,
      address,
      price,
      album: "[]",
      type,
      availableroom,
      hostId: userID,
    });
    await prop.save();
    res.send("data");
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ msg: error.message });
  }
});

propRouter.get("/property", async (req: Request, res: Response) => {
  try {
    Property.belongsTo(Host, {
      foreignKey: "hostId",
    });

    let property = await Property.findAll({
      include: [Host],
    });
    res.send({ msg: "here is your data", property });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ msg: error.message });
  }
});

propRouter.patch("/image/:id", auth, async (req: Request, res: Response) => {
  let { userID, url } = req.body;
  let id = req.params.id;
  try {
    let prop = await Property.findOne({ where: { hostId: userID, id: id } });
    let album = JSON.parse(prop.dataValues.album);
    album.push(url);
    await Property.update(
      { album: JSON.stringify(album) },
      { where: { hostId: userID, id: id } }
    );

    res.status(200).send({ msg: "here is your prop" });
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ msg: error.message });
  }
});



propRouter.get("/slots/:propId",async(req:Request,res:Response)=>{
  let propId=req.params.propId
  let slots=await Slot.findAll({where:{propId}})
  res.status(200).send(slots)
})

export default propRouter;