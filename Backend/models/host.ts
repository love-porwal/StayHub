import { DataTypes, Model, Sequelize } from 'sequelize';
import db from '../config/db';


enum HostRole {
  Admin = "admin",
  Host = "host",
  User = "user",
}
interface HostAttributes {
  id:number;
  name: string;
  email: string;
  mobile: number;
  password: string;
  role:HostRole;
}

class Host extends Model<HostAttributes> {}

Host.init(
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
      defaultValue: HostRole.Host,  
    },
  },
  {
    sequelize: db,
    tableName: 'hosts',
  }
);

export default Host;