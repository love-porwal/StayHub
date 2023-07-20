// import {Sequelize} from 'sequelize'
// const sequelize = new Sequelize({

// })

import * as dotenv from 'dotenv'
// {//method 2 for connected to db
dotenv.config()
// const mysql = require('mysql2')
// const connection = mysql.createConnection(process.env.DATABASE_URL)
// console.log('Connected to PlanetScale!')
// // connection.end()

// export default connection;
//}
// console.log(process.env)
import {Sequelize} from "sequelize"
const seq=new Sequelize(process.env.DATABASE,process.env.URNAME,process.env.PASSWORD,{
    host:process.env.HOST,
    dialect:"mysql",
    "dialectOptions": {
        "ssl": {
          "rejectUnauthorized": true,
        }
    }
})

export default seq