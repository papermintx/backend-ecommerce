const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const Product = require('./models/Product');
const Category = require('./models/Category');

// Associations
Category.hasMany(Product, { foreignKey: 'categoryId' });
Product.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

// Routes
const authRoutes = require('./routes/authRoute');
const productRoutes = require('./routes/productRoute');
const orderRoutes = require('./routes/orderRoute');
const categoryRoutes = require('./routes/categoryRoute');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
// CORS Configuration - Allow all origins for development
const corsOptions = {
    origin: '*', // Allow all origins
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
};

app.use(cors(corsOptions));

// Helmet with relaxed CSP for development
app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    contentSecurityPolicy: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes Usage
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/categories', categoryRoutes);

// Base Route
app.get('/', (req, res) => {
    res.send('Fashion Store Backend is Running');
});

// Database Sync & Server Start
const seedCategories = require('./seeders/categorySeeder');
const seedAdmin = require('./seeders/adminSeeder');

sequelize.sync({ alter: true })
    .then(async () => {
        console.log('Database synced successfully');
        await seedCategories(); // Auto-seed categories
        await seedAdmin(); // Auto-seed admin account
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('Failed to sync database:', err);
    });
