const express = require('express');
const router = express.Router();
const db = require('../models/db');

// GET all dogs for a specific owner
router.get('/owner/:ownerId', async (req, res) => {
  const { ownerId } = req.params;
  try {
    const [dogs] = await db.query('SELECT dog_id, name FROM Dogs WHERE owner_id = ?', [ownerId]);
    res.json(dogs);
  } catch (error) {
    console.error("Failed to fetch owner's dogs:", error);
    res.status(500).json({ error: "Failed to fetch owner's dogs" });
  }
});

module.exports = router;