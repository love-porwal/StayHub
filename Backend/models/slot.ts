import sequelize, { DataTypes, Model, Sequelize, Optional } from "sequelize";
import seq from "../config/db";
import Host from './host';
 
const Slot = seq.define("products", {
  propId:sequelize.INTEGER,
  hostId: sequelize.INTEGER,
  userId:sequelize.INTEGER,
  isAvailable:{type:sequelize.BOOLEAN, defaultValue:true}   
});

 

export default Slot;