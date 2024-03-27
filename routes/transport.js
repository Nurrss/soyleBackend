const router = require('express').Router();
const _ = require('lodash');
const Users = require('../models/Users');
const ApiOptimizer = require('../api');
const errorHandler = require('../middleware/errorHandler');

const users = new ApiOptimizer(Users);
const modelName = 'Users';

router.get('/', async (req, res) => {
  try {
    await users.getAll(req, res);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.get('/:id', async (req, res) => {
  try {
    await users.getById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const entityId = _.get(req, 'params.id');
    const { name, type, cost } = req.body;
    const fieldsToUpdate = { name, type, cost };
    await users.updateById({ entityId, fieldsToUpdate, req, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await users.deleteById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

module.exports = router;
