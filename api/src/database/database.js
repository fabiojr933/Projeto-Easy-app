const knex = require('knex');
const env = require('dotenv');

env.config();
const pg_database = process.env.DATABASE_NAME;
const pg_host = process.env.DATABASE_HOST;
const pg_user = process.env.DATABASE_USER;
const pg_password = process.env.DATABASE_PASS;
const pg_port = Number(process.env.DATABASE_PORT);

const database = knex({
    client: 'pg',
    version: '14.2',
    connection: {
        host: pg_host,
        port: pg_port,
        user: pg_user,
        password: pg_password,
        database: pg_database
    },
    migrations: {
        directory: 'src/database/migrations/',
    },
});

module.exports = database;