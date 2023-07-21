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

enum UserRole {
  Admin = "admin",
  Host = "host",
  User = "user",
}

interface UserAttributes {
  name: string;
  email: string;
  mobile: number;
  password: string;
  role:UserRole;
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
      defaultValue: UserRole.User, // Set the default value to "user"
    },
  },
  {
    sequelize: db,
    tableName: 'users',
  }
);

export default User;

