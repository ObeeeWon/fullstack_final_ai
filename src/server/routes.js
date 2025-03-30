const express = require('express');
const CategoryController = require("./controllers/CategoryController");

const router = express.Router();

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.patch('/categories/:category_id', CategoryController.update);
router.delete('/categories/:category_id', CategoryController.destroy);

module.exports = router;