const pg = require('pg');

const config = {
    database: 'jazzy_sql',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

const pool = new pg.Pool(config);

pool.on('connect', () => {
    console.log('Postgresql connected!');
});

pool.on('error', error => {
    console.log('Error connecting to postgresql', error);
});

module.exports = pool;