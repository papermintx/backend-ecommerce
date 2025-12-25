const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const resizeImages = async (req, res, next) => {
    if (!req.files) return next();

    // Helper to process a single file
    const processFile = async (file) => {
        const filename = `compressed-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;
        const outputPath = path.join('uploads', filename);

        // Ensure uploads directory exists
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }

        await sharp(file.buffer)
            .resize(1024, 1024, { // Max dimensions, maintain aspect ratio
                fit: 'inside',
                withoutEnlargement: true
            })
            .jpeg({ quality: 80 }) // Compress to JPEG with 80% quality
            .toFile(outputPath);

        // Mimic multer's diskStorage file object structure so controllers don't break
        file.filename = filename;
        file.path = outputPath;
        file.destination = 'uploads/';
        // Remove buffer to free memory
        delete file.buffer;
    };

    try {
        // Handle 'image' field (single or array)
        if (req.files['image']) {
            await Promise.all(req.files['image'].map(processFile));
        }

        // Handle 'gallery' field (array)
        if (req.files['gallery']) {
            await Promise.all(req.files['gallery'].map(processFile));
        }

        next();
    } catch (error) {
        console.error('Image processing error:', error);
        return res.status(500).json({ error: 'Gagal memproses gambar.' });
    }
};

module.exports = resizeImages;
