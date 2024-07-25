const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database');

class ChangeLog extends Model {}

ChangeLog.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entityType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  entityId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  newValue: {
    type: DataTypes.JSON,
    allowNull: true,
  }
}, {
    sequelize, // Pass the sequelize instance
    modelName: 'ChangeLog',
    timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
    // Other model options go here
});

module.exports = ChangeLog;