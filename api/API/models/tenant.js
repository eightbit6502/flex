const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class Tenant extends Model { }

Tenant.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	addressLine1: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	addressLine2: {
		type: DataTypes.STRING,
		allowNull: true,
	},
	state: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	postcode: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	country: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	status: {
		type: DataTypes.STRING,
		allowNull: false,
		defaultValue: "ACTIVE",
	},
	createdBy: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users',
			key: 'id',
		},
		allowNull: false,
	},
	updatedBy: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users',
			key: 'id',
		},
		allowNull: false,
	},
	totalUsers: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	},
	totalBays: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	}
}, {
	sequelize,
	modelName: 'Tenant',
	timestamps: true,
});

module.exports = Tenant;
