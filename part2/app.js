const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
// Route to return users as JSON
app.get('/', async (req, res) => {
  try {
    const [user] = await db.execute('SELECT * FROM UserS');
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