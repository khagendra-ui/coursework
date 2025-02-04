const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost', // or your MySQL container name
    user: 'root',      // Your MySQL username
    password: '',      // Your MySQL password (leave blank if using XAMPP)
    database: 'circular_fashion'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = db;
