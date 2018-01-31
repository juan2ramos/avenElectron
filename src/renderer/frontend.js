import settings from 'electron-settings';
const {Pool} = require('pg');
const pool = new Pool({
    user:  settings.get('DB.user'),
    host: settings.get('DB.host'),
    database: settings.get('DB.database'),
    password: settings.get('DB.password'),
    port: settings.get('DB.port'),
});

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1)
});

window.addEventListener('load', () => {
    pool.connect((err, client, done) => {
        if (err) throw err
        client.query('SELECT * FROM products', (err, res) => {
            done();

            if (err) {
                console.log(err.stack)
            } else {
                console.log(res.rows[0])
            }
        })
    });

});