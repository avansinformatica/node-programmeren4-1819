<<<<<<< HEAD
'use strict'

const mysql = require('mysql2');
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const config = require('./config')[env];

console.log(`Connecting to db ${config.database} as user ${config.username}`)

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: config.host,
  user: config.username,
  database: config.database,
  password: config.password,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

module.exports = pool;
=======
// get the client
const mysql = require('mysql2');

const dbconfig = {
	host: process.env.DB_HOST || 'localhost',
	user: process.env.DB_USER || 'gamedb_user',
	database: process.env.DB_DATABASE || 'gamedb',
	password: process.env.DB_PASSWORD,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0
}

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool(dbconfig);

console.log(`Connected to database '${dbconfig.database}' on host '${dbconfig.host}'`)

module.exports = pool
>>>>>>> master
