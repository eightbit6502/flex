// // models/groupUser.js
// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/database'); // Adjust the path as needed

// class BuildingTenant extends Model { }

// BuildingTenant.init({
// 	id: {
// 		type: DataTypes.INTEGER,
// 		autoIncrement: true,
// 		primaryKey: true
// 	},
// 	buildingId: {
// 		type: DataTypes.INTEGER,
// 		references: {
// 			model: 'Buildings', // 'Groups' refers to the table name
// 			key: 'id'
// 		},
// 		allowNull: false
// 	},
// 	tenantId: {
// 		type: DataTypes.INTEGER,
// 		references: {
// 			model: 'Tenants', // 'Users' refers to the table name
// 			key: 'id'
// 		},
// 		allowNull: false
// 	}
// }, {
// 	sequelize,
// 	modelName: 'BuildingTenant',
// 	timestamps: true // Enable timestamps if you want createdAt and updatedAt fields
// });

// module.exports = BuildingTenant;

const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed

class BuildingTenant extends Model { }

BuildingTenant.init({
  buildingId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Buildings', // 'Buildings' refers to the table name
      key: 'id'
    },
    allowNull: false
  },
  tenantId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Tenants', // 'Tenants' refers to the table name
      key: 'id'
    },
    allowNull: false
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
  modelName: 'BuildingTenant',
  timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
});

module.exports = BuildingTenant;
