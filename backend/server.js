const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const app = express();
const port = 5001;

app.use(express.json());

// MySQL database connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Replace with your MySQL username
    password: '', // Replace with your MySQL password
    database: 'circular_fashion',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

// Registration route
app.post('/api/register', (req, res) => {
    const { username, email, password } = req.body;
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password' });
        }
        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.query(query, [username, email, hashedPassword], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error inserting user into database' });
            }
            res.status(200).json({ message: 'User registered successfully' });
        });
    });
});

// Login route
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error querying the database' });
        }
        if (result.length === 0) {
            return res.status(400).json({ message: 'User not found' });
        }

        // Compare password with hashed password
        bcrypt.compare(password, result[0].password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords' });
            }
            if (isMatch) {
                return res.status(200).json({ message: 'Login successful' });
            } else {
                return res.status(400).json({ message: 'Incorrect password' });
            }
        });
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
