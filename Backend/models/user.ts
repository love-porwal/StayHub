import seq from "../config/db";
// import sequelize from "sequelize"

//method-1
// interface users {
//     name:string,
//     email:string,
//     mobile:number,
//     password:string
// }

// const user = seq.define("users",{
//     "name":sequelize.STRING,
//     "email":sequelize.STRING,
//     "mobile":sequelize.INTEGER,
//     "password":sequelize.STRING,
// })

// export default user
import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../config/db';

interface UserAttributes {
  name: string;
  email: string;
  mobile: number;
  password: string;
}

class User extends Model<UserAttributes> {}

User.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
  }
);

export default User;

