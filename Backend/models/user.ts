import seq from "../config/db";
 
import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../config/db';


enum UserRole {
  Admin = "admin",
  Host = "host",
  User = "user",
}


interface UserAttributes {
  id:number;
  name: string;
  email: string;
  mobile: number;
  password: string;
  role:UserRole;

}

class User extends Model<UserAttributes> {}

User.init(
  {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(1234),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: UserRole.User,  
    },
   
  },
  {
    sequelize: db,
    tableName: 'users',
  }
);

export default User;
