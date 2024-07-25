require('dotenv').config();
const { Sequelize } = require('sequelize');
const constants = require('./constants');

// const sequelize = new Sequelize(process.env.DB_NAME || constants.ENV_DBNAME, process.env.DB_USER || constants.ENV_DBUSER, process.env.DB_PWD || constants.ENV_DBPWD, {
// 	host: process.env.DB_HOST || constants.ENV_DBHOST,
// 	//host: "database",
// 	dialect: 'postgres',
// 	logging: false, // Set to true if you want to see SQL logs
// });

// module.exports = sequelize;

const sequelize = new Sequelize(
	process.env.DB_NAME || constants.ENV_DBNAME,
	process.env.DB_USER || constants.ENV_DBUSER,
	process.env.DB_PWD || constants.ENV_DBPWD,
	{
	  host: process.env.DB_HOST || constants.ENV_DBHOST,
	  dialect: 'postgres',
	  logging: false, // Set to true if you want to see SQL logs
	}
  );
  
  module.exports = { sequelize };
  