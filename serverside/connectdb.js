const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize('tempvestingdb','testuser', process.env.DB_PASSWORD,{
    host: 'localhost',
    dialect: 'postgres',
  },
);

const connectdb = async() =>{
    try {
        await db.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = {connectdb, db};