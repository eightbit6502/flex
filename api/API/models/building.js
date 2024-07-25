const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed
const constants = require('../config/constants');


class Building extends Model { }

Building.init({
	// Define attributes
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false, // name cannot be null
	},
	latitude: {
		type: DataTypes.FLOAT,
		allowNull: false, // latitude cannot be null
	},
	longitude: {
		type: DataTypes.FLOAT,
		allowNull: false, // longitude cannot be null
	},
	addressLine1: {
		type: DataTypes.STRING,
		allowNull: true, // address_line_1 cannot be null
	},
	addressLine2: {
		type: DataTypes.STRING,
		allowNull: true, // address_line_2 can be null
	},
	state: {
		type: DataTypes.STRING,
		allowNull: true, // state cannot be null
	},
	postcode: {
		type: DataTypes.STRING,
		allowNull: true, // postcode cannot be null
	},
	country: {
		type: DataTypes.STRING,
		allowNull: true, // country cannot be null
	},
	contactName: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	contactTel: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	contactEmail: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	totalTenants: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	totalSites: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false, // isActive cannot be null
		defaultValue: constants.STATUS_ACTIVE,
	},
	createdBy: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users', // 'Users' refers to the table name
			key: 'id',
		},
		allowNull: false
	},
	updatedBy: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users', // 'Users' refers to the table name
			key: 'id',
		},
		allowNull: false
	}
}, {
	sequelize, // Pass the sequelize instance
	modelName: 'Building',
	timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
	// Other model options go here
});



module.exports = Building;
