const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3001;
const secret = 'your_secret_key'; // Replace with your actual secret key

app.use(cors());
app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, 'users.json');
const productsFilePath = path.join(__dirname, 'products.json');

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Read data from JSON file
function readFromFile(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([]));
  }
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
}

// Write data to JSON file
function writeToFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// Login endpoint
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Replace this with real authentication logic
  if (username === 'subin' && password === 'password') {
    const token = jwt.sign({ username: 'subin' }, secret);
    res.json({ success: true, token });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

// Add user endpoint
app.post('/users', authenticateToken, (req, res) => {
  const { username, password, role } = req.body;
  let users = readFromFile(usersFilePath);
  users.push({ username, password, role });
  writeToFile(usersFilePath, users);
  res.json({ success: true });
});

// Add product endpoint
app.post('/products', authenticateToken, (req, res) => {
  const { name, company, price, stock } = req.body;
  let products = readFromFile(productsFilePath);
  products.push({ name, company, price, stock });
  writeToFile(productsFilePath, products);
  res.json({ success: true });
});

// Retrieve users endpoint (for demonstration)
app.get('/users', authenticateToken, (req, res) => {
  const users = readFromFile(usersFilePath);
  res.json(users);
});

// Retrieve products endpoint (for demonstration)
app.get('/products', authenticateToken, (req, res) => {
  const products = readFromFile(productsFilePath);
  res.json(products);
});

const localIP = '0.0.0.0'; // Listens on all network interfaces

app.listen(port, localIP, () => {
  console.log(`Server running at http://${localIP}:${port}`);
});