const sequelize = require('./config/database');
const Product = require('./models/Product');
const Category = require('./models/Category');
const ProductGallery = require('./models/ProductGallery');
const User = require('./models/User'); // Assuming you want to reset users too
const Review = require('./models/Review'); // Assuming Review model exists or needed

const resetDatabase = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // force: true adds DROP TABLE IF EXISTS before CREATE TABLE
        await sequelize.sync({ force: true });
        console.log('Database reset successfully. All data has been deleted.');

        process.exit(0);
    } catch (error) {
        console.error('Unable to reset database:', error);
        process.exit(1);
    }
};

resetDatabase();
