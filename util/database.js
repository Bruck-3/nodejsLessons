const mysql = require('mysql2')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Abebebesobela11.',
    database: 'nodejs'
})

module.exports = pool.promise()