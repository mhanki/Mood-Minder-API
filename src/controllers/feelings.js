const router = require('express').Router();
const db = require('../db');

const getAll = () => new Promise((resolve) => {
  const sql = `SELECT * FROM feelings`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result);
  })
});

const getOne = (id) => new Promise((resolve) => {
  const sql = `SELECT * FROM feelings WHERE ID = ${id}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result[0]);
  })
});

router.get('/', async (req, res, next) => {
  try {
    const feelings = await getAll();
    res.json(feelings);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const feeling = await getOne(req.params.id);
    res.send({ feeling });
  } catch (err) {
    next(err);
  }
});

module.exports = router;