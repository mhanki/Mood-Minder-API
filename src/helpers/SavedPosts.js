const db = require('../db');

const createOne = (params, userId) => new Promise((resolve) => {
  const { title, postId } = params;

  const sql = `INSERT INTO saved_posts (title, post_id, created_at, user_id) 
    VALUES (?, ?, ?, ?)`;

  const values = [
    title, 
    postId, 
    new Date().toISOString().slice(0, 19).replace('T', ' '), 
    userId
  ];

  db.query(sql, values, (err, result) => {
    if(err) { throw err };
    resolve(result.insertId);
  })
});

const getAll = (userId) => new Promise((resolve) => {
  const sql = `SELECT * FROM saved_posts WHERE user_id = '${userId}'`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result);
  })
});

const getOne = (savedId, userId) => new Promise((resolve) => {
  const sql = `SELECT * FROM saved_posts WHERE ID = ${savedId} AND user_id = '${userId}'`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result[0]);
  })
});

const updateOne = (savedId, userId, params) => new Promise(async (resolve) =>  {
  const { title, postId } = params;

  const sql = `UPDATE saved_posts
    SET title = ?,
        post_id = ?,
        updated_at = ?
    WHERE ID = ${savedId} AND user_id = ${userId}`;

  const values = [
    title,
    postId,
    new Date().toISOString().slice(0, 19).replace('T', ' ')
  ]

  db.query(sql, values, (err, result) => {
    if(err) { throw err };
    resolve(result.changedRows);
  })
});

const deleteOne = (savedId, userId) => new Promise((resolve) => {
  const sql = `DELETE FROM saved_posts WHERE ID = ${savedId} AND user_id = ${userId}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result.affectedRows);
  })
});

module.exports = { createOne, getAll, getOne, updateOne, deleteOne };