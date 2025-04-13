const express = require('express');
const CategoryController = require("./controllers/CategoryController"); // Imports the Category controller
const ItemController = require("./controllers/ItemController"); // Imports the Item controller
const StorefrontController = require("./controllers/StorefrontController"); // Imports the Storefront controller
const AuthController = require("./controllers/AuthController"); // Imports the AuthController
const multer = require('multer'); // Imports the multer middleware for file uploads
const path = require('path'); // Imports the path module for handling file paths

const router = express.Router();//gather all routers

// Configure multer for handling file uploads (remains the same)
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../public/images/'), // Specifies the directory for storing uploaded images
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Authentication Routes
router.post('/auth/register', AuthController.register); // Route for user registration
router.post('/auth/login', AuthController.login); // Route for user login
router.post('/auth/logout', AuthController.logout); // Route for user logout

// Simple Authentication Middleware
const isAuthenticated = (req, res, next) => {
    // In a real application, you would implement more robust authentication logic
    // For example, checking for a valid Session or JWT
    // Here, we simply assume the user is logged in
    const isLoggedIn = true; // Replace with your actual authentication logic
    if (isLoggedIn) {
        next(); // User is logged in, proceed to the next middleware or route handler
    } else {
        res.status(401).json({ message: 'Unauthorized' }); // User is not logged in, return 401 Unauthorized
    }
};

// Protected Category Routes
router.get('/categories', isAuthenticated, CategoryController.index); // Apply isAuthenticated middleware
router.post('/categories', isAuthenticated, CategoryController.store); // Apply isAuthenticated middleware
router.patch('/categories/:category_id', isAuthenticated, CategoryController.update); // Apply isAuthenticated middleware
router.delete('/categories/:category_id', isAuthenticated, CategoryController.destroy); // Apply isAuthenticated middleware

// Protected Item Routes
router.get('/items', isAuthenticated, ItemController.index); // Apply isAuthenticated middleware
router.post('/items', isAuthenticated, upload.single('image'), ItemController.store); // Apply isAuthenticated middleware
router.patch('/items/:item_id', isAuthenticated, upload.single('image'), ItemController.update); // Apply isAuthenticated middleware
router.delete('/items/:item_id', isAuthenticated, ItemController.destroy); // Apply isAuthenticated middleware
router.delete('/items/:item_id/image', isAuthenticated, ItemController.deleteImage); // Apply isAuthenticated middleware

// Storefront Route (remains the same - no authentication needed for the storefront)
router.get('/storefront', StorefrontController.getStorefrontData);

module.exports = router; // Exports the router with all defined routes