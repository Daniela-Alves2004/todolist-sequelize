const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); 

const Task = sequelize.define('Task', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true, 
});

module.exports = Task;
