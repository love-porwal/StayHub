// import {Sequelize} from 'sequelize'
// const sequelize = new Sequelize({

// })


// {//method 2 for connected to db
// require('dotenv').config()
// const mysql = require('mysql2')
// const connection = mysql.createConnection(process.env.DATABASE_URL)
// console.log('Connected to PlanetScale!')
// // connection.end()

// export default connection;
//}
import {Sequelize} from "sequelize"
const seq=new Sequelize("stayhub","y0rsf98dprzaipzw4aey","pscale_pw_Q7bjllzdcrzTqxIH7P3wcg2E9bF5WeycK81E4AdEBtD",{
    host:"aws.connect.psdb.cloud",
    dialect:"mysql",
    "dialectOptions": {
        "ssl": {
          "rejectUnauthorized": true,
        }
    }
})

export default seq