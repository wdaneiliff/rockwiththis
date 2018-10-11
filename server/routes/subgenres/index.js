const express = require('express');
const router = express.Router();
const database = require('../../db');

router.get('/', (req, res) => {
  database.query('SELECT * FROM subgenres')
    .then(results => {
      res.json({ subgenres: results.rows });
    });
});

module.exports = router;
