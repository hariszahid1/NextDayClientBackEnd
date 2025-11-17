const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// GET /api/clients - return all clients from 'clients' collection
router.get('/', async (req, res) => {
  try {
    const db = mongoose.connection;
    // Directly query the collection in case a model is not defined
    const collection = db.collection('clients');
    const clients = await collection.find({}).toArray();
    res.json({ success: true, clients });
  } catch (err) {
    console.error('Error fetching clients:', err);
    res.status(500).json({ success: false, error: 'Failed to fetch clients' });
  }
});

module.exports = router;
