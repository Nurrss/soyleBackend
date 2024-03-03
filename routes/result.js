const router = require('express').Router();
const _ = require('lodash');
const examController = require('../controllers/examController');

router.post('/:examId', examController.submitWord);
router.post('/:examId/submission/:submissionId', examController.getResults);

module.exports = router;
