import sequelize, { DataTypes, Model, Sequelize, Optional } from "sequelize";
import seq from "../config/db";
import Host from './host';
 
const Property = seq.define("products", {
  name: sequelize.STRING,
  address: sequelize.STRING,
  price: sequelize.INTEGER,
  album: sequelize.STRING,
  type: sequelize.STRING,
  availableroom: sequelize.INTEGER,
  currating: {type:sequelize.INTEGER,defaultValue:0},
  hostId: sequelize.INTEGER,
     
});

 

export default Property;