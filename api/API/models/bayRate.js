const { Model, DataTypes } = require('sequelize');
const { sequelize } = require('../config/database'); // Adjust the path as needed

class BayRate extends Model {}

BayRate.init({
    id: {
		type: DataTypes.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
    bayId: {
        type: DataTypes.INTEGER,
        references: { model: 'Bays', key: 'id' }
    },
    rateId: {
        type: DataTypes.INTEGER,
        references: { model: 'Rates', key: 'id' }
    },
    groups: {
        type: DataTypes.JSON,
        allowNull: true
    },
    createdBy: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users', // 'Users' refers to the table name
			key: 'id',
		},
		allowNull: false // createdBy cannot be null
	},
	updatedBy: {
		type: DataTypes.INTEGER,
		references: {
			model: 'Users', // 'Users' refers to the table name
			key: 'id',
		},
		allowNull: false // updatedBy cannot be null
	}
}, {
    sequelize,
    modelName: 'BayRate',
    timestamps: true
});

module.exports = BayRate;
