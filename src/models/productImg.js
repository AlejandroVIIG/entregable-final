const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const ProductImg = sequelize.define('productImg', {
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false
    },
    // productId
},
{
    timestamps: false
});

module.exports = ProductImg;