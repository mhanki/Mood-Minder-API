const router = require('express').Router();
const savedPostsHelper = require('../helpers/SavedPosts');

router.post('/', async (req, res, next) => {
  try {
    const savedId = await savedPostsHelper.createOne(req.body, req.decoded.id);
    res.json({ savedId });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const savedPosts = await savedPostsHelper.getAll(req.decoded.id);
    res.json(savedPosts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const savedPost = await savedPostsHelper.getOne(req.params.id, req.decoded.id);
    res.send({ savedPost });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const updatedSave = await savedPostsHelper.updateOne(req.params.id, req.decoded.id, req.body);
    
    updatedSave > 0
      ? res.send('Update successful')
      : res.send('No matching record')
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedSave = await savedPostsHelper.deleteOne(req.params.id, req.decoded.id);
    
    deletedSave > 0
      ? res.send('Deleted')
      : res.send('No matching record')
  } catch (err) {
    next(err);
  }
});

module.exports = router;