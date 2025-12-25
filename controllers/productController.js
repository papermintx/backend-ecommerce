const Product = require('../models/Product');
const ProductGallery = require('../models/ProductGallery');
const Category = require('../models/Category');

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, stock, categoryId } = req.body;

        // Handle main image
        const imageUrl = req.files && req.files['image'] ? `/uploads/${req.files['image'][0].filename}` : null;

        const product = await Product.create({
            name, description, price, stock, imageUrl, categoryId
        });

        // Handle gallery images
        if (req.files && req.files['gallery']) {
            const galleryPromises = req.files['gallery'].map(file => {
                return ProductGallery.create({
                    productId: product.id,
                    imageUrl: `/uploads/${file.filename}`
                });
            });
            await Promise.all(galleryPromises);
        }

        // Fetch complete product with gallery
        const newProduct = await Product.findByPk(product.id, {
            include: [{ model: ProductGallery, as: 'galleries' }]
        });

        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const { categoryId } = req.query;
        let whereClause = {};
        if (categoryId) {
            whereClause.categoryId = categoryId;
        }

        const products = await Product.findAll({
            where: whereClause,
            include: [{ model: Category, as: 'category' }]
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: ProductGallery, as: 'galleries' }]
        });
        if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        console.log('========================================');
        console.log('UPDATE PRODUCT REQUEST');
        console.log('========================================');
        console.log('Product ID:', req.params.id);
        console.log('Body:', req.body);
        console.log('Files:', req.files ? Object.keys(req.files) : 'No files');

        if (req.files) {
            if (req.files['image']) {
                console.log('Main image files:', req.files['image'].length);
                req.files['image'].forEach((f, i) => {
                    console.log(`  [${i}] ${f.filename || 'NO FILENAME'}`);
                });
            }
            if (req.files['gallery']) {
                console.log('Gallery files:', req.files['gallery'].length);
            }
        }

        const { name, description, price, stock, categoryId } = req.body;
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: ProductGallery, as: 'galleries' }]
        });

        if (!product) {
            console.log('❌ Product not found');
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        console.log('Current imageUrl:', product.imageUrl);

        const fs = require('fs');
        const path = require('path');

        // Handle main image update
        if (req.files && req.files['image'] && req.files['image'].length > 0) {
            const newImageFile = req.files['image'][0];

            console.log('Processing main image update...');
            console.log('New file object:', {
                filename: newImageFile.filename,
                originalname: newImageFile.originalname,
                size: newImageFile.size
            });

            // Delete old main image if exists
            if (product.imageUrl) {
                const oldImagePath = path.join(__dirname, '..', product.imageUrl);
                console.log('Attempting to delete old image:', oldImagePath);

                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log('✓ Old main image DELETED:', product.imageUrl);
                } else {
                    console.log('⚠ Old image file not found:', oldImagePath);
                }
            }

            // Set new main image
            const newImageUrl = `/uploads/${newImageFile.filename}`;
            console.log('Setting new imageUrl:', newImageUrl);
            product.imageUrl = newImageUrl;
            console.log('✓ New main image SET:', product.imageUrl);
        } else {
            console.log('No main image to update');
        }

        // Handle gallery images update
        if (req.files && req.files['gallery'] && req.files['gallery'].length > 0) {
            console.log('Processing gallery update...');

            // Delete all old gallery images
            if (product.galleries && product.galleries.length > 0) {
                console.log('Deleting', product.galleries.length, 'old gallery images...');

                product.galleries.forEach(gallery => {
                    const oldGalleryPath = path.join(__dirname, '..', gallery.imageUrl);
                    if (fs.existsSync(oldGalleryPath)) {
                        fs.unlinkSync(oldGalleryPath);
                        console.log('✓ Old gallery image deleted:', gallery.imageUrl);
                    }
                });

                // Delete gallery records from database
                await ProductGallery.destroy({ where: { productId: product.id } });
                console.log('✓ Gallery records deleted from database');
            }

            // Add new gallery images
            const galleryPromises = req.files['gallery'].map(file => {
                const galleryUrl = `/uploads/${file.filename}`;
                console.log('Adding gallery image:', galleryUrl);
                return ProductGallery.create({
                    productId: product.id,
                    imageUrl: galleryUrl
                });
            });
            await Promise.all(galleryPromises);
            console.log(`✓ ${req.files['gallery'].length} new gallery images added`);
        }

        // Update other fields
        if (name) {
            console.log('Updating name:', product.name, '→', name);
            product.name = name;
        }
        if (description) {
            console.log('Updating description');
            product.description = description;
        }
        if (price) {
            console.log('Updating price:', product.price, '→', price);
            product.price = price;
        }
        if (stock !== undefined && stock !== null) {
            console.log('Updating stock:', product.stock, '→', stock);
            product.stock = stock;
        }
        if (categoryId) {
            console.log('Updating categoryId:', product.categoryId, '→', categoryId);
            product.categoryId = categoryId;
        }

        console.log('Saving product to database...');
        await product.save();
        console.log('✓ Product saved successfully');

        // Fetch updated product with galleries
        const updatedProduct = await Product.findByPk(product.id, {
            include: [{ model: ProductGallery, as: 'galleries' }]
        });

        console.log('Updated product imageUrl:', updatedProduct.imageUrl);
        console.log('========================================');
        console.log('UPDATE COMPLETE');
        console.log('========================================');

        res.json(updatedProduct);
    } catch (error) {
        console.error('❌ UPDATE ERROR:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [{ model: ProductGallery, as: 'galleries' }]
        });

        if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan' });

        // Delete Main Image
        if (product.imageUrl) {
            const fs = require('fs');
            const path = require('path');
            const mainPath = path.join(__dirname, '..', product.imageUrl);
            if (fs.existsSync(mainPath)) fs.unlinkSync(mainPath);
        }

        // Delete Gallery Images
        if (product.galleries && product.galleries.length > 0) {
            const fs = require('fs');
            const path = require('path');
            product.galleries.forEach(gallery => {
                const galleryPath = path.join(__dirname, '..', gallery.imageUrl);
                if (fs.existsSync(galleryPath)) fs.unlinkSync(galleryPath);
            });
        }

        await product.destroy();
        res.json({ message: 'Produk dan gambar berhasil dihapus' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
