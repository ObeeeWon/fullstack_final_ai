const db = require("../connection");

module.exports = {
    index(req, res) {
        db.query(`SELECT * FROM items`, (err, results) => {
            if (err) return res.sendStatus(500);
            return res.send({ items: results });
        });
    },
    store(req, res) {
        console.log("Received body:", req.body);

        db.query(
            `INSERT INTO items (title, description, price, quantity, sku, category_id) VALUES (?, ?, ?, ?, ?, ?)`,
            [
                req.body.item.title,
                req.body.item.description,
                req.body.item.price,
                req.body.item.quantity,
                req.body.item.sku,
                req.body.item.category_id
            ],
            (err, result) => {
                console.log("result: " + JSON.stringify(result));
                if (err) return res.sendStatus(500);

                db.query(`SELECT * FROM items`, (err, results) => {
                    if (err) return res.sendStatus(500);
                    return res.send({ items: results });
                });
            }
        );
    },
    update(req, res) {
        db.query(
            `UPDATE items SET title=?, description=?, price=?, quantity=?, sku=? , category_id=?WHERE item_id=?`,
            [
                req.body.item.title,
                req.body.item.description,
                req.body.item.price,
                req.body.item.quantity,
                req.body.item.sku,
                req.body.item.category_id,
                req.params.item_id
            ],
            (err, result) => {
                if (err) return res.sendStatus(500);

                db.query(`SELECT * FROM items`, (err, results) => {
                    if (err) return res.sendStatus(500);
                    return res.send({ items: results });
                });
            }
        );
    },
    destroy(req, res) {
        db.query(`DELETE FROM items WHERE item_id=?`, [req.params.item_id], (err, result) => {
            if (err) return res.sendStatus(500);

            db.query(`SELECT * FROM items`, (err, results) => {
                if (err) return res.sendStatus(500);
                return res.send({ items: results });
            });
        });
    }
};
