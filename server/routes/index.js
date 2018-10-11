const express = require('express');
const router = express.Router();
const songs = require('./songs');
const subgenres = require('./subgenres');

router.use('/songs', songs);
router.use('/subgenres', subgenres);

module.exports = router;
