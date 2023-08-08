const router = require('express').Router();
const logsHelper = require('../helpers/logs');

router.post('/', async (req, res, next) => {
  try {
    const logId = await logsHelper.createOne(req.body, req.decoded.id);
    res.json({ logId });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const logs = await logsHelper.getAll(req.decoded.id);
    res.json(logs);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const log = await logsHelper.getOne(req.params.id, req.decoded.id);
    res.send({ log });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const changedLog = await logsHelper.updateOne(req.params.id, req.decoded.id, req.body);
    
    changedLog > 0
      ? res.send('Update successful')
      : res.send('No matching record')
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedLog = await logsHelper.deleteOne(req.params.id, req.decoded.id);
    
    deletedLog > 0
      ? res.send('Deleted')
      : res.send('No matching record')
  } catch (err) {
    next(err);
  }
});

module.exports = router;