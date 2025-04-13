// backend/controllers/ItemController.js
const db = require("../connection");
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises; // Import promises version of fs for asynchronous file operations

// Configure multer for handling file uploads
const storage = multer.diskStorage({
    destination: './images/', // Directory where uploaded images will be stored
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

module.exports = {
    index(req, res) {
        // Fetch all items from the database
        db.query('SELECT * FROM items', (err, items) => {
            if (err) return res.status(500).send({ error: 'Error fetching items' });
            return res.send({ items });
        });
    },
    
    store(req, res) {
        // Extract item details from the request body
        const { title, category_id, description, price } = req.body;
        // Get the image URL if a file was uploaded
        const imageUrl = req.file ? `/images/${req.file.filename}` : null;
    
        // Insert the new item into the database
        db.query('INSERT INTO items (title, category_id, description, price, image_url) VALUES (?, ?, ?, ?, ?)', [title, category_id, description, price, imageUrl], (err, result) => {
            if (err) {
                // If there was an error and a file was uploaded, delete the file
                if (req.file) {
                    fs.unlink(req.file.path);
                }
                return res.status(500).send({ error: 'Error creating item' });
            }
            // After successful insertion, fetch all items and send them in the response
            db.query('SELECT * FROM items', (err, items) => {
                if (err) return res.status(500).send({ error: 'Error fetching updated items' });
                return res.send({ items });
            });
        });
    },

    update(req, res) {
        const itemId = req.params.item_id;
        const { title, category_id, description, price } = req.body.item;
        const imageUrl = req.file ? `/images/${req.file.filename}` : null;

        let query = 'UPDATE items SET title = ?, category_id = ?, description = ?, price = ?';
        const params = [title, category_id, description, price];

        // If a new image was uploaded, add the image_url to the update query
        if (imageUrl) {
            query += ', image_url = ?';
            params.push(imageUrl);
        }

        query += ' WHERE item_id = ?';
        params.push(itemId);

        // Update the item in the database
        db.query(query, params, (err, result) => {
            if (err) {
                // If there was an error and a file was uploaded, delete the file
                if (req.file) {
                    fs.unlink(req.file.path);
                }
                return res.status(500).send({ error: 'Error updating item' });
            }
            // After successful update, fetch all items and send them in the response
            db.query('SELECT * FROM items', (err, items) => {
                if (err) return res.status(500).send({ error: 'Error fetching updated items' });
                return res.send({ items });
            });
        });
    },

    destroy(req, res) {
        const itemId = req.params.item_id;

        // First, fetch the image URL of the item to be deleted
        db.query('SELECT image_url FROM items WHERE item_id = ?', [itemId], async (err, results) => {
            if (err) {
                return res.status(500).send({ error: 'Error fetching image URL to delete.' });
            }
            const imageUrlToDelete = results[0]?.image_url;

            // Delete the item from the database
            db.query('DELETE FROM items WHERE item_id = ?', [itemId], async (deleteErr) => {
                if (deleteErr) {
                    return res.status(500).send({ error: 'Error deleting item.' });
                }
                // If there was an associated image, delete the image file
                if (imageUrlToDelete && imageUrlToDelete.startsWith('/images/')) {
                    const imagePathToDelete = path.join(__dirname, '../../public', imageUrlToDelete);
                    try {
                        await fs.unlink(imagePathToDelete);
                    } catch (unlinkErr) {
                        console.error('Error deleting image:', unlinkErr);
                    }
                }
                // After successful deletion, fetch all remaining items and send them in the response
                db.query('SELECT * FROM items', (err, items) => {
                    if (err) return res.status(500).send({ error: 'Error fetching remaining items' });
                    return res.send({ items });
                });
            });
        });
    },

    // Upload a new image for an item
    uploadImage: [upload.single('image'), async (req, res) => {
        const itemId = req.params.item_id;
        if (!req.file) {
            return res.status(400).send({ error: 'No image file uploaded.' });
        }
        const imageUrl = `/images/${req.file.filename}`; // Store the path relative to the public directory

        // Update the item's image URL in the database
        db.query('UPDATE items SET image_url = ? WHERE item_id = ?', [imageUrl, itemId], (err, result) => {
            if (err) {
                // If there's an error, delete the uploaded file
                fs.unlink(req.file.path);
                return res.status(500).send({ error: 'Error updating item with image URL.' });
            }
            return res.send({ message: 'Image uploaded successfully.', imageUrl: imageUrl });
        });
    }],

    // Replace an existing image for an item
    replaceImage: [upload.single('image'), async (req, res) => {
        const itemId = req.params.item_id;
        if (!req.file) {
            return res.status(400).send({ error: 'No image file uploaded.' });
        }
        const newImageUrl = `/images/${req.file.filename}`;

        // First, fetch the old image URL
        db.query('SELECT image_url FROM items WHERE item_id = ?', [itemId], async (err, results) => {
            if (err) {
                fs.unlink(req.file.path);
                return res.status(500).send({ error: 'Error fetching old image URL.' });
            }
            const oldImageUrl = results[0]?.image_url;

            // Update the item with the new image URL
            db.query('UPDATE items SET image_url = ? WHERE item_id = ?', [newImageUrl, itemId], async (updateErr) => {
                if (updateErr) {
                    fs.unlink(req.file.path);
                    return res.status(500).send({ error: 'Error updating item with new image URL.' });
                }
                // Delete the old image file if it exists and is not a default image
                if (oldImageUrl && oldImageUrl.startsWith('/images/')) {
                    const oldImagePath = path.join(__dirname, '../../public', oldImageUrl);
                    try {
                        await fs.unlink(oldImagePath);
                    } catch (unlinkErr) {
                        console.error('Error deleting old image:', unlinkErr);
                    }
                }
                return res.send({ message: 'Image replaced successfully.', imageUrl: newImageUrl });
            });
        });
    }],

    // Delete the image associated with an item
    deleteImage: async (req, res) => {
        const itemId = req.params.item_id;

        // First, fetch the image URL to be deleted
        db.query('SELECT image_url FROM items WHERE item_id = ?', [itemId], async (err, results) => {
            if (err) {
                return res.status(500).send({ error: 'Error fetching image URL to delete.' });
            }
            const imageUrlToDelete = results[0]?.image_url;

            // Set the image URL in the database to NULL
            db.query('UPDATE items SET image_url = NULL WHERE item_id = ?', [itemId], async (updateErr) => {
                if (updateErr) {
                    return res.status(500).send({ error: 'Error setting image URL to NULL.' });
                }
                // Delete the image file if it exists and is not a default image
                if (imageUrlToDelete && imageUrlToDelete.startsWith('/images/')) {
                    const imagePathToDelete = path.join(__dirname, '../../public', imageUrlToDelete);
                    try {
                        await fs.unlink(imagePathToDelete);
                    } catch (unlinkErr) {
                        console.error('Error deleting image:', unlinkErr);
                    }
                }
                return res.send({ message: 'Image deleted successfully.' });
            });
        });
    }
};