// models/groupUser.js
const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed

class GroupUser extends Model { }

GroupUser.init({
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	groupId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Groups', // 'Groups' refers to the table name
			key: 'id'
		},
		allowNull: false
	},
	userId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users', // 'Users' refers to the table name
			key: 'id'
		},
		allowNull: false
	}
}, {
	sequelize,
	modelName: 'GroupUser',
	timestamps: true // Enable timestamps if you want createdAt and updatedAt fields
});

module.exports = GroupUser;