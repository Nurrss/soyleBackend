const router = require('express').Router();
const _ = require('lodash');
const Exams = require('../models/Exams');
const ApiOptimizer = require('../api');
const examController = require('../controllers/examController');
const errorHandler = require('../middleware/errorHandler');

const exams = new ApiOptimizer(Exams);
const modelName = 'Exams';

router.route('/').get(async (req, res) => {
  try {
    await exams.getAll(req, res);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    await exams.getById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.post('/add', async (req, res) => {
  try {
    const { title } = req.body;
    const entity = { title };
    await exams.add({ entity, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const entityId = _.get(req, 'params.id');
    const { word } = req.body;
    const fieldsToUpdate = { word };
    await exams.updateById({ entityId, fieldsToUpdate, req, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await exams.deleteById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.post('/:id/words', examController.addWordToExam);

module.exports = router;
