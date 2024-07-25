const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed
const constants = require('../config/constants');

class User extends Model { }

User.init({
	// Define attributes
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	mobile: {
		type: DataTypes.STRING,
		allowNull: true, // mobile_phone can be null
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: 'PENDING_ACTIVATION', // default status is 'PENDING_ACTIVATION'
	},
	activationToken: {
		type: DataTypes.STRING,
		allowNull: true
	},
	activationTokenExpires: {
		type: DataTypes.DATE,
		allowNull: true
	},
	passwordResetToken: {
		type: DataTypes.STRING,
		allowNull: true
	},
	passwordResetTokenExpires: {
		type: DataTypes.DATE,
		allowNull: true
	},
	tenantId: {
		type: DataTypes.INTEGER,
		allowNull: true, // client_id can be null
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		unique: true
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	role: {
		type: DataTypes.STRING,
		allowNull: true,
		defaultValue: constants.ROLE_USER
	},
	paymentToken: {
		type: DataTypes.STRING,
		allowNull: true
	},
}, {
	sequelize, // Pass the sequelize instance
	modelName: 'User',
	timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
	// Other model options go here
});

module.exports = User;
