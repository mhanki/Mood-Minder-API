const db = require('../db');
const bcrypt = require('bcrypt');

const createUser = (params) => new Promise(async (resolve, reject) => {
  const {name, username, email, password} = params;

  checkPasswordRequirements(password);
  
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const sql = `INSERT INTO users (name, username, email, password, created_at)
    VALUES (
      '${name}', 
      '${username}', 
      '${email}', 
      '${passwordHash}', 
      '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
    )`;
  
  db.query(sql, (err, results) => {
    if(err) { reject(new Error(err.message)) };
    resolve(results.insertId);
  });
});

const getUser = (id) => new Promise((resolve, reject) => {
  const sql = `SELECT * FROM users WHERE ID = ${id}`;

  db.query(sql, (err, result) => {
    if(err) { reject(new Error(err.message)) };
    resolve(result[0]);
  })
});

const findUser = (email) => new Promise((resolve, reject) => {
  const sql = `SELECT * FROM users WHERE email = '${email}'`;

  db.query(sql, (err, result) => {
    if(err) { reject(new Error(err.message)) };
    resolve(result[0]);
  })
});

const checkPasswordRequirements = (password) => {
  if(!password) throw {
    name: 'ValidationError',
    message: 'Password is required'
  }
  
  if(password.length < 3) throw {
    name: 'ValidationError',
    message: 'Password must be at least 3 characters long'
  }
}

module.exports = { createUser, getUser, findUser }