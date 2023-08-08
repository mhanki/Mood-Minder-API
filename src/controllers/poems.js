const router = require('express').Router();
const poemsHelper = require('../helpers/Poems');

router.post('/', async (req, res, next) => {
  try {
    const poemId = await poemsHelper.createOne(req.decoded.id, req.body);
    res.json({ poemId });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const poems = await poemsHelper.getAll(req.decoded.id);
    res.json(poems);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const poem = await poemsHelper.getOne(req.params.id, req.decoded.id);
    res.send({ poem });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const changedPoems = await poemsHelper.updateOne(req.params.id, req.decoded.id, req.body);
    
    changedPoems > 0
      ? res.send('Update successful')
      : res.send('No matching record')
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedPoem = await poemsHelper.deleteOne(req.params.id, req.decoded.id);
    
    deletedPoem > 0
      ? res.send('Deleted')
      : res.send('No matching record')
  } catch (err) {
    next(err);
  }
});

module.exports = router;