const db = require("../connection");

module.exports = {
    getStorefrontData(req, res) {
        db.query('SELECT items.item_id, items.title, items.description, items.price, categories.category_name FROM items JOIN categories ON items.category_id = categories.category_id', (err, items) => {
            if (err) return res.status(500).send({ error: 'Error fetching storefront data' });
            //add category_name into the items array
            //console.log(items);
            const formattedItems = items.map(item => ({
                id: item.item_id,
                title: item.title,
                description: item.description,
                price: item.price,
                category: item.category_name,
            }));

            return res.send(formattedItems);
        });
    }
};

