const express = require('express');
const router = express.Router();
const wordController = require('../controllers/wordController');

router.post('/check-word', wordController.checkWord);

module.exports = router;
