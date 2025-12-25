const Review = require('../models/Review');
const User = require('../models/User');

exports.addReview = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body;
        const review = await Review.create({
            userId: req.user.id,
            productId,
            rating,
            comment
        });
        res.status(201).json(review);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { productId: req.params.productId },
            include: [{ model: User, attributes: ['username'] }]
        });
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
