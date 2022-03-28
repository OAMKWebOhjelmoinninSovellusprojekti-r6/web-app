require('dotenv').config(); // TODO This should be moved on top of index.js in future, no need to have this multiple times in application
const mysql = require('mysql');

// Define database connection parameters
const pool = mysql.createPool({
  connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,    
  password: process.env.MYSQL_PASSWORD,
  user: process.env.MYSQL_USER,
  database: process.env.MYSQL_DATABASE,
  host: process.env.MYSQL_HOST,
}); 

// Every database query in application is created with this function
// Function takes raw sql query string as parameter. eg. 'SELECT * FROM `user`' and handles request/response with Promise
async function query(sql, values){
  return new Promise((resolve, reject)=>{
    pool.query(sql, values, (error, elements)=>{
        if(error){
            return reject(error);
        }
        return resolve(elements);
    });
  });
}

module.exports = {
  query
}