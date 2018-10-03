const express = require('express');
const router = express.Router();
const database = require('../../db');

router.get('/', (req, res) => {
  database.query('SELECT * FROM songs')
    .then(results => {
      res.json({ songs: results.rows });
    });
});

module.exports = router;
