
module.exports = {

  development: {
    username: 'gamedb_user',
    password: 'secret',
    database: 'gamedb',
    host:     'localhost'
  },

  test: {
    username: 'db_test_user',
    password: 'secret',
    database: 'db_test_database',
    host:     'localhost'
  },

  production: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host:     process.env.DB_HOSTNAME
  }

}
