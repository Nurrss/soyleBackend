const router = require("express").Router();
const _ = require("lodash");

const Words = require("../models/Words");
const ApiOptimizer = require("../api");
const errorHandler = require("../middleware/errorHandler");

const words = new ApiOptimizer(Words);
const modelName = "Words";

// get all done
router.route("/").get(async (req, res) => {
  try {
    await words.getAll(req, res);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

//delete an Words by id done
router.route("/:id").delete(async (req, res) => {
  try {
    await words.deleteById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// get by id done
router.route("/:id").get(async (req, res) => {
  try {
    await words.getById(req, res, modelName);
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// add new Words done
router.post("/add", async (req, res) => {
  try {
    const { sudject, status, finished_at, started_at } = req.body;
    const entity = { sudject, status, finished_at, started_at };
    await words.add({ entity, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

// Update Words done
router.route("/:id").put(async (req, res) => {
  try {
    const entityId = _.get(req, "params.id");
    const { sudject, status, finished_at, started_at } = req.body;
    const fieldsToUpdate = { sudject, status, finished_at, started_at };
    await words.updateById({ entityId, fieldsToUpdate, req, res });
  } catch (err) {
    errorHandler(err, req, res);
  }
});

module.exports = router;
