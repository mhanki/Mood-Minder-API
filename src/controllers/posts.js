const router = require('express').Router();
const postsHelper = require('../helpers/posts');

router.post('/', async (req, res, next) => {
  try {
    const postId = await postsHelper.createOne(req.decoded.id, req.body);
    res.json({ postId });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const posts = await postsHelper.getAll(req.decoded.id);
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const post = await postsHelper.getOne(req.params.id, req.decoded.id);
    res.send({ post });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const changedPosts = await postsHelper.updateOne(req.params.id, req.decoded.id, req.body);
    
    changedPosts > 0
      ? res.send({ postId: req.params.id})
      : res.send('No matching record')
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deletedPost = await postsHelper.deleteOne(req.params.id, req.decoded.id);
    
    deletedPost > 0
      ? res.send('Deleted')
      : res.send('No matching record')
  } catch (err) {
    next(err);
  }
})

module.exports = router;