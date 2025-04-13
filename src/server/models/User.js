// backend/models/User.js
const db = require("../connection"); // Imports the database connection
const bcrypt = require('bcrypt'); // Imports the bcrypt library for password hashing

const User = {
    findByUsername: (username, callback) => {
        // Queries the database to find a user by their username
        db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
            if (err) return callback(err); // If there's an error, pass it to the callback
            callback(null, results[0]); // If successful, pass the first result (the user object) to the callback
        });
    },
    create: (username, password, callback) => {
        // Hashes the password before storing it in the database
        bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) return callback(err); // If there's an error during hashing, pass it to the callback
            // Inserts a new user into the users table with the hashed password
            db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], callback);
        });
    }
};

module.exports = User; // Exports the User model for use in other parts of the application