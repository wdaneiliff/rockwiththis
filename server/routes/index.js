const express = require('express');
const router = express.Router();
const songs = require('./songs');

router.use('/songs', songs);

module.exports = router;
