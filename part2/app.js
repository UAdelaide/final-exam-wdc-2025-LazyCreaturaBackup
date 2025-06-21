const express = require('express');
const path = require('path');
const session = require('express-session');

require('dotenv').config();
const db = require('./models/db');

const app = express();


// Route to serve index.html first
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Route to return users as JSON
app.get('/api/users', async (req, res) => {
  try {
    const [user] = await db.execute('SELECT * FROM Users');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);

// Export the app instead of listening here
module.exports = app;