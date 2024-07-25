const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed

class Booking extends Model { }

Booking.init({
	// Define attributes
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	startDate: {
		type: DataTypes.DATE,
		allowNull: false, // startDate cannot be null
	},
	endDate: {
		type: DataTypes.DATE,
		allowNull: false, // endDate cannot be null
	},
	userId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users', // 'Users' refers to the table name
			key: 'id',
		},
		allowNull: false, // userId cannot be null
	},
	siteId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Sites', // 'Sites' refers to the table name
			key: 'id',
		},
		allowNull: false, // siteId cannot be null
	},
	bayId: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Bays', // 'Bays' refers to the table name
			key: 'id',
		},
		allowNull: false, // bayId cannot be null
	},
	transactionId: {
		type: DataTypes.INTEGER,
		// references: {
		// 	model: 'Transactions', // 'Transactions' refers to the table name
		// 	key: 'id',
		// },
		allowNull: false, // transactionId cannot be null
	},
	carRegistration: {
		type: DataTypes.STRING,
		allowNull: false, // carRegistration cannot be null
	},
	transactionAmount: {
		type: DataTypes.FLOAT,
		allowNull: false, // transactionAmount cannot be null
	},
	cancelReason: {
		type: DataTypes.STRING
	},
	cancelDate: {
		type: DataTypes.DATE
	},
	carRegistration: {
		type: DataTypes.STRING,
		allowNull: false, // carRegistration cannot be null
	},
	salesInvoiceId: {
		type: DataTypes.STRING
	},
	createdBy: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users', // 'Users' refers to the table name
			key: 'id',
		},
		allowNull: false, // createdBy cannot be null
	},
	updatedBy: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users', // 'Users' refers to the table name
			key: 'id',
		},
		allowNull: false, // updatedBy cannot be null
	}
}, {
	sequelize, // Pass the sequelize instance
	modelName: 'Booking',
	timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
	// Other model options go here
});

module.exports = Booking;