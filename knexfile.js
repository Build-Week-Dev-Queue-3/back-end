// bring in the .env file
require('dotenv').config();
const connectionString = process.env.DATABASE_URL;

module.exports = {

  development: {
    client: 'sqlite3',
    connection: { 
      filename: './data/bwusers.db3' 
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        conn.run('PRAGMA foreign_keys = ON', done)
      },
      },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { 
      directory: './data/seeds', 
    },
  },
  
  testing: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: connectionString || {
      host: "localhost",
      database: 'devdeskbw',
      user:     'postgres',
      password: 'marctapp'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './data/migrations',
    },
    seeds: { 
      directory: './data/seeds', 
    },
  }

}
