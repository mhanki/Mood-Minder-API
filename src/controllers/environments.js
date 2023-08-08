const router = require('express').Router();
const db = require('../db');

const getAll = () => new Promise((resolve) => {
  const sql = `SELECT * FROM environments`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result);
  })
});

const getOne = (id) => new Promise((resolve) => {
  const sql = `SELECT * FROM environments WHERE ID = ${id}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result[0]);
  })
});

router.get('/', async (req, res, next) => {
  try {
    const environments = await getAll();
    res.json(environments);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const environment = await getOne(req.params.id);
    res.send({ environment });
  } catch (err) {
    next(err);
  }
});

module.exports = router;