const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed
const constants = require('../config/constants');

class Group extends Model { }

Group.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	description: {
		type: DataTypes.STRING,
		allowNull: true
	},
	tenantId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Tenants', // 'Tenants' refers to the table name
			key: 'id',
		},
		allowNull: false
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false, // status cannot be null
		defaultValue: constants.STATUS_ACTIVE,
	},
	totalUsers: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 0,
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
	sequelize,
	modelName: 'Group',
	timestamps: true // Enable timestamps if you want createdAt and updatedAt fields
});

module.exports = Group;
