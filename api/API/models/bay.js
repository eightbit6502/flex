const { Sequelize, DataTypes, Model } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed
const constants = require('../config/constants');

class Bay extends Model {}

Bay.init({
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
    size: {
        type: DataTypes.STRING,
        allowNull: false, // size cannot be null
    },
    availableFrom: {
        type: DataTypes.TIME,
        allowNull: false, // AvailableFrom cannot be null
    },
    availableUntil: {
        type: DataTypes.TIME,
        allowNull: false, // AvailableUntil cannot be null
    },
    siteId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Sites', // 'Sites' refers to the table name
            key: 'id',
        },
        allowNull: false, // SiteId cannot be null
    },
    tenantId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Tenants', // 'Tenants' refers to the table name
            key: 'id',
        },
        allowNull: true, // tenantId can be null
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: constants.STATUS_ACTIVE, // default status is 'ACTIVE'
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
    modelName: 'Bay',
    timestamps: true, // Enable timestamps if you want createdAt and updatedAt fields
    // Other model options go here
});

module.exports = Bay;