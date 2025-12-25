const Product = require('../models/Product');

exports.checkoutWhatsApp = async (req, res) => {
    try {
        const { items } = req.body; // items: [{ productId, quantity }]

        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'Keranjang kosong' });
        }

        let message = "Halo Admin, saya ingin memesan:\n\n";
        let total = 0;

        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (product) {
                const subtotal = product.price * item.quantity;
                message += `- ${product.name} (${item.quantity}x) - Rp${subtotal}\n`;
                total += subtotal;
            }
        }

        message += `\nTotal: Rp${total}`;
        message += "\n\nMohon diproses, terima kasih.";

        // Encode message for URL
        const encodedMessage = encodeURIComponent(message);
        const adminPhone = process.env.WHATSAPP_NUMBER || '6281234567890';
        const whatsappUrl = `https://wa.me/${adminPhone}?text=${encodedMessage}`;

        res.json({ whatsappUrl });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
