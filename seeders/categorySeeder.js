const Category = require('../models/Category');

const seedCategories = async () => {
    try {
        const count = await Category.count();

        if (count === 0) {
            await Category.bulkCreate([
                { name: 'Sepatu' },
                { name: 'Celana' },
                { name: 'Baju' }
            ]);
            console.log('✓ Categories seeded successfully (Sepatu, Celana, Baju)');
        } else {
            console.log('✓ Categories already exist, skipping seed');
        }
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
};

module.exports = seedCategories;
