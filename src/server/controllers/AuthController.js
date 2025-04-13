// backend/controllers/AuthController.js
const User = require('../models/User'); // Imports the User model
const bcrypt = require('bcrypt'); // Imports the bcrypt library for password comparison
const jwt = require('jsonwebtoken'); // We might use JWT later for more advanced authentication

const AuthController = {
    register: (req, res) => {
        // Handles user registration
        const { username, password } = req.body; // Extracts username and password from the request body
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' }); // Returns an error if username or password is missing
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                console.error('Error finding user:', err);
                return res.status(500).json({ message: 'Error registering user.' }); // Returns an error if there's a database issue
            }
            if (user) {
                return res.status(409).json({ message: 'Username already exists.' }); // Returns an error if the username is already taken
            }

            User.create(username, password, (err, result) => {
                if (err) {
                    console.error('Error creating user:', err);
                    return res.status(500).json({ message: 'Error registering user.' }); // Returns an error if there's a database issue during user creation
                }
                return res.status(201).json({ message: 'User registered successfully.' }); // Returns a success message upon successful registration
            });
        });
    },

    login: (req, res) => {
        // Handles user login
        const { username, password } = req.body; // Extracts username and password from the request body
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required.' }); // Returns an error if username or password is missing
        }

        User.findByUsername(username, (err, user) => {
            if (err) {
                console.error('Error finding user:', err);
                return res.status(500).json({ message: 'Error logging in.' }); // Returns an error if there's a database issue
            }
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials.' }); // Returns an error if the user is not found
            }

            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    console.error('Error comparing passwords:', err);
                    return res.status(500).json({ message: 'Error logging in.' }); // Returns an error if there's an issue during password comparison
                }
                if (isMatch) {
                    // Password matches, user logged in successfully
                    // In a real application, you might generate a Session or JWT here
                    return res.status(200).json({ message: 'Logged in successfully.' }); // Returns a success message upon successful login
                } else {
                    return res.status(401).json({ message: 'Invalid credentials.' }); // Returns an error if the password doesn't match
                }
            });
        });
    },

    // Simple logout logic (if needed)
    logout: (req, res) => {
        // In a real application, you might need to clear the Session or JWT
        return res.status(200).json({ message: 'Logged out successfully.' }); // Returns a success message for logout
    }
};

module.exports = AuthController; // Exports the AuthController for use in routes