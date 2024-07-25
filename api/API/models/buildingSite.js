const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed

class BuildingSite extends Model { }

BuildingSite.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  buildingId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Buildings', // 'Buildings' refers to the table name
      key: 'id',
    },
    allowNull: false, // buildingId cannot be null
  },
  siteId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Sites', // 'Sites' refers to the table name
      key: 'id',
    },
    allowNull: false, // siteId cannot be null
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
  modelName: 'BuildingSite',
  timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
});

module.exports = BuildingSite;
