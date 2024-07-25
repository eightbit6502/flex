const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed
const constants = require('../config/constants');

class Site extends Model { }

Site.init({
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
    type: DataTypes.TEXT,
    allowNull: true
  },
  latitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  longitude: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  addressLine1: {
    type: DataTypes.STRING,
    allowNull: false
  },
  addressLine2: {
    type: DataTypes.STRING,
    allowNull: true
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postcode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dailyOpen: {
    type: DataTypes.TIME,
    allowNull: true
  },
  dailyClose: {
    type: DataTypes.TIME,
    allowNull: true
  },
  siteMaxVehicleHeight: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  siteType: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: constants.STATUS_ACTIVE
  },
  totalBays: {
		type: DataTypes.INTEGER,
		allowNull: false,
    defaultValue: 0
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
  modelName: 'Site',
  timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
});

module.exports = Site;
