const db = require('../db');

const createOne = (userId, params) => new Promise((resolve) => {
  const { title, content } = params;

  const sql = `INSERT INTO poems (title, content, created_at, user_id) 
    VALUES (?, ?, ?, ?)`;

  const values = [
    title, 
    content, 
    new Date().toISOString().slice(0, 19).replace('T', ' '), 
    userId
  ];

  db.query(sql, values, (err, result) => {
    if(err) { throw err };
    resolve(result.insertId);
  })
});

const getAll = (userId) => new Promise((resolve) => {
  const sql = `SELECT * FROM poems WHERE user_id = ${userId}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result);
  })
});

const getOne = (poemId, userId) => new Promise((resolve) => {
  const sql = `SELECT * FROM poems WHERE ID = ${poemId} AND user_id = ${userId}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result[0]);
  })
});

const updateOne = (poemId, userId, params) => new Promise(async (resolve) =>  {
  const { title, content } = params;

  const sql = `UPDATE poems
    SET title = ?,
        content = ?,
        updated_at = ?
    WHERE ID = ${poemId} AND user_id = ${userId}`;

  const values = [
    title,
    content,
    new Date().toISOString().slice(0, 19).replace('T', ' ')
  ]

  db.query(sql, values, (err, result) => {
    if(err) { throw err };
    resolve(result.changedRows);
  })
});

const deleteOne = (poemId, userId) => new Promise((resolve) => {
  const sql = `DELETE FROM poems WHERE ID = ${poemId} AND user_id = ${userId}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result.affectedRows);
  })
});

module.exports = { createOne, getAll, getOne, updateOne, deleteOne };