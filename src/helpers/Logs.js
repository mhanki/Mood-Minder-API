const db = require('../db');

const createOne = (params, userId) => new Promise((resolve) => {
  const { feeling, environment } = params;

  const sql = `INSERT INTO logs (feeling_id, environment_id, created_at, user_id) 
    VALUES (?, ?, ?, ?)`;

  const values = [
    feeling, 
    environment, 
    new Date().toISOString().slice(0, 19).replace('T', ' '), 
    userId
  ];

  db.query(sql, values, (err, result) => {
    if(err) { throw err };
    resolve(result.insertId);
  })
});

const getAll = (userId) => new Promise((resolve) => {
  const sql = `SELECT logs.*, 
      feelings.name AS feeling, 
      feelings.rank AS feeling_rank, 
      environments.name AS environment
    FROM logs
    JOIN feelings ON feelings.ID = logs.feeling_id
    JOIN environments ON environments.ID = logs.environment_id
    WHERE user_id = ${userId}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result);
  })
});

const getOne = (logId, userId) => new Promise((resolve) => {
  const sql = `SELECT * FROM logs WHERE ID = ${logId} AND user_id = '${userId}'`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result[0]);
  })
});

const updateOne = (logId, userId, params) => new Promise(async (resolve) =>  {
  const { feeling, environment } = params;

  const sql = `UPDATE logs
    SET feeling_id = ?,
        environment_id = ?,
        updated_at = ?
    WHERE ID = ${logId} AND user_id = ${userId}`;

  const values = [
    feeling,
    environment,
    new Date().toISOString().slice(0, 19).replace('T', ' ')
  ]

  db.query(sql, values, (err, result) => {
    if(err) { throw err };
    resolve(result.changedRows);
  })
});

const deleteOne = (logId, userId) => new Promise((resolve) => {
  const sql = `DELETE FROM logs WHERE ID = ${logId} AND user_id = ${userId}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result.affectedRows);
  })
});

module.exports = { createOne, getAll, getOne, updateOne, deleteOne };