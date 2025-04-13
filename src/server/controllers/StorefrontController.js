const db = require("../connection");

module.exports = {
    getStorefrontData(req, res) {
        db.query('SELECT items.item_id, items.title, items.description, items.price, categories.category_name, items.image_url FROM items JOIN categories ON items.category_id = categories.category_id', (err, items) => {
            if (err) return res.status(500).send({ error: 'Error fetching storefront data' });

            const formattedItems = items.map(item => ({
                id: item.item_id,
                title: item.title,
                description: item.description,
                price: item.price,
                category: item.category_name,
                imageUrl: item.image_url,
            }));

            // Define your banner image URL array here.
            // In a real application, you might fetch these URLs from a database, configuration file, or environment variables.
            const banners = [
                "/images/banner1.png",
                "/images/banner2.png",
                "/images/banner3.png"
                // ... more banner image URLs
            ];

            return res.send({ items: formattedItems, banners: banners }); // Return an object containing both items and banners
        });
    }
};