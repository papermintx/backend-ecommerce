const User = require('../models/User');
const bcrypt = require('bcryptjs');

const seedAdmin = async () => {
    try {
        // Check if admin already exists
        const adminExists = await User.findOne({
            where: { email: 'admin@example.com' }
        });

        if (!adminExists) {
            // Hash password
            const hashedPassword = await bcrypt.hash('Admin123!', 10);

            // Create admin user
            await User.create({
                username: 'Administrator',
                email: 'admin@example.com',
                password: hashedPassword,
                role: 'admin'
            });

            console.log('✓ Admin account created successfully');
            console.log('  Email: admin@example.com');
            console.log('  Password: Admin123!');
        } else {
            console.log('✓ Admin account already exists, skipping seed');
        }
    } catch (error) {
        console.error('Error seeding admin:', error);
    }
};

module.exports = seedAdmin;
