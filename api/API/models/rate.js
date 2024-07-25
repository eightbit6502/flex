const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed

const constants = require('../config/constants');

// class Rate extends Model { }

// Rate.init({
// 	// Define attributes
// 	id: {
// 		type: DataTypes.INTEGER,
// 		autoIncrement: true,
// 		primaryKey: true
// 	},
// 	name: {
// 		type: DataTypes.STRING,
// 		allowNull: false, // type cannot be null
// 	},
// 	type: {
// 		type: DataTypes.STRING,
// 		allowNull: false, // type cannot be null
// 	},
// 	value: {
// 		type: DataTypes.FLOAT,
// 		allowNull: false, // value cannot be null
// 	},
// 	startTime: {
// 		type: DataTypes.TIME,
// 		allowNull: true, // startTime can be null
// 	},
// 	endTime: {
// 		type: DataTypes.TIME,
// 		allowNull: true, // endTime can be null
// 	},
// 	dayOfWeek: {
// 		type: DataTypes.STRING,
// 		allowNull: true, // dayOfWeek can be null
// 	},
// 	siteId: {
// 		type: DataTypes.INTEGER,
// 		references: {
// 			model: 'Sites', // 'Sites' refers to the table name
// 			key: 'id',
// 		},
// 		allowNull: false, // siteId cannot be null
// 	},
// 	createdBy: {
// 		type: DataTypes.INTEGER,
// 		references: {
// 			model: 'Users', // 'Users' refers to the table name
// 			key: 'id',
// 		},
// 		allowNull: false, // createdBy cannot be null
// 	},
// 	updatedBy: {
// 		type: DataTypes.INTEGER,
// 		references: {
// 			model: 'Users', // 'Users' refers to the table name
// 			key: 'id',
// 		},
// 		allowNull: false, // updatedBy cannot be null
// 	},
// }, {
// 	sequelize, // Pass the sequelize instance
// 	modelName: 'Rate',
// 	timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
// 	// Other model options go here
// });



// module.exports = Rate;



// /*
// In this code, Bay.hasMany(Rate, { foreignKey: 'BayId' }) establishes a one-to-many relationship from Bay to Rate. The foreignKey option tells Sequelize that the BayId column in the Rate model is the foreign key.

// The Rate model has a type attribute which could be “daily”, “monthly”, or “hourly”, a value attribute which is the rate for that type, and a dayOfWeek attribute which could be a string representing the day of the week (e.g., “Monday”, “Tuesday”, etc.). The startTime and endTime attributes allow you to specify different rates for different times of the day. If startTime and endTime are null, it means the rate applies to the whole day.

// This way, each Bay can have multiple Rates, providing the flexibility you need for your pricing structure. 😊


// */



class Rate extends Model { }

Rate.init({
	// Basic Rate Information
	id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false, // type cannot be null
	},
	type: {
		type: DataTypes.ENUM(constants.RATE_HOURLY, constants.RATE_DAILY, constants.RATE_MONTHLY, constants.RATE_SPECIAL),
		allowNull: false
	},
	value: {
		type: DataTypes.FLOAT,
		allowNull: false
	},

	// Time-related Fields
	startTime: {
		type: DataTypes.TIME,
		allowNull: true
	},
	endTime: {
		type: DataTypes.TIME,
		allowNull: true
	},
	dayOfWeek: {
		type: DataTypes.STRING,		
		allowNull: true
	},

	// Special Date Range for 'special' rate type
	specialStartDate: {
		type: DataTypes.DATEONLY,
		allowNull: true
	},
	specialEndDate: {
		type: DataTypes.DATEONLY,
		allowNull: true
	},

	// Foreign Key to Site/Bay
	siteId: {
		type: DataTypes.INTEGER,
		allowNull: false,
		references: {
			model: 'Sites',
			key: 'id'
		}
	},
	
	status: {
		type: DataTypes.STRING,
		allowNull: false, // status cannot be null
		defaultValue: constants.STATUS_ACTIVE,
	},

	// Auditing Fields
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
	},
}, {
	sequelize,
	modelName: 'Rate'
	// other options...
});


module.exports = Rate;