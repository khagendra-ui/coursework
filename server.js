const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from the backend!');
});

// Registration Endpoint
app.post('/api/register', (req, res) => {
  const { username, email, password } = req.body;
  // Simulate a registration process
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields!' });
  }
  // Assuming registration is successful
  res.status(200).json({ message: 'Registration successful!' });
});

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  // Simulate a login process
  if (username === 'test' && password === 'test') {
    return res.status(200).json({ message: 'Login successful!' });
  }
  return res.status(401).json({ message: 'Invalid credentials!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
