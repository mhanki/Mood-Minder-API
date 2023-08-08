const router = require('express').Router();
const usersHelper = require('../helpers/Users');

router.post('/', async (req, res, next) => {
  const userId = await usersHelper.createUser(req.body);
  res.send({ userId });
});

router.get('/', async (req, res, next) => {
  const user = await usersHelper.getUser(req.decoded.id);
  res.send({ user });
})

module.exports = router;