const express = require('express');
const router = express.Router();
const database = require('../../db');

router.get('/', (req, res) => {
  database.query('SELECT * FROM curators')
    .then(results => {
      res.json({ curators: results.rows });
    });
});

module.exports = router;
