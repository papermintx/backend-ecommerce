const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Product = require('./Product');

const ProductGallery = sequelize.define('ProductGallery', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    timestamps: false
});

ProductGallery.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
Product.hasMany(ProductGallery, { foreignKey: 'productId', as: 'galleries', onDelete: 'CASCADE' });

module.exports = ProductGallery;
