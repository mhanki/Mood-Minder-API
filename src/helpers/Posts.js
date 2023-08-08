const db = require('../db');

const createOne = (userId, params) => new Promise((resolve) => {
  const { content, isPrivate } = params;

  const sql = `INSERT INTO posts (content, is_private, created_at, user_id)
    VALUES (?, ?, ?, ?)`;

  const values = [
    content, 
    isPrivate, 
    new Date().toISOString().slice(0, 19).replace('T', ' '),
    userId
  ];

  db.query(sql, values, (err, result) => {
    if(err) { throw err };
    resolve(result.insertId);
  })
});

const getAll = (userId) => new Promise((resolve) => {
  const sql = `SELECT * FROM posts WHERE user_id = ${userId}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result);
  })
});

const getOne = (postId, userId) => new Promise((resolve, reject) => {
  const sql = `SELECT * FROM posts WHERE ID = ${postId}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    
    const post = result[0];

    if(!post.is_private) {
      resolve(post);
    }

    if(post.user_id === userId){
      resolve(post);
    } else {
      reject(new Error("Access denied"));
    }
  })
});

const updateOne = (postId, userId, params) => new Promise(async (resolve, reject) =>  {
  const { content, isPrivate } = params;

  const sql = `UPDATE posts
    SET content = ?,
        is_private = ?,
        updated_at = ?
    WHERE ID = ${postId} AND user_id = ${userId}`;

  const values = [content, isPrivate, new Date().toISOString().slice(0, 19).replace('T', ' ')]

  db.query(sql, values, (err, result) => {
    if(err) { throw err };
    resolve(result.changedRows);
  })
});

const deleteOne = (postId, userId) => new Promise((resolve) => {
  const sql = `DELETE FROM posts WHERE ID = ${postId} AND user_id = ${userId}`;

  db.query(sql, (err, result) => {
    if(err) { throw err };
    resolve(result.affectedRows);
  })
});

module.exports = { createOne, getAll, getOne, updateOne, deleteOne };