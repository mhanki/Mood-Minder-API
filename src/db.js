const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'mood-minder'
});

db.connect((err) => {
  if(err){
    throw err;
  }
  
  console.log('MySQL is connected');
});

module.exports = db;