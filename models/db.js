const mysql = require('mysql');


const pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'M1M2**mm',
    database: 'test',
});


const query = (sql, params, callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Database connection error:', err);
            callback(err, null);
            return;
        }

        connection.query(sql, params, (error, results) => {
            connection.release(); 

            if (error) {
                console.error('DB error:', error);
                callback(error, null);
                return;
            }

            callback(null, results);
        });
    });
};

module.exports = { query };
