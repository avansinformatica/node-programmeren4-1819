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