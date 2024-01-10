// api.js

const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.post('/login', (req, res) => {
    const { username, password } = req.body;

   
    const sql = 'SELECT * FROM Employees WHERE Username = ? AND Password = ?';
    db.query(sql, [username, password], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({ success: false, message: 'Error querying to db!!' });
        }

        if (results.length > 0) {
           
            const user = results[0];

            
            const logSql = 'INSERT INTO Log (Username, LoginDate) VALUES (?, NOW())';
            db.query(logSql, [user.Username], (logErr, logResults) => {
                if (logErr) {
                    console.error('Login log error:', logErr);
                    return res.json({ success: false, message: 'Error logging in.' });
                }

                
                req.session.loggedin = true;

                
                res.json({ success: true, message: 'successful logging' });
            });
        } else {
            
            res.json({ success: false, message: 'Wrong credentials.' });
        }
    });
});




router.post('/logout', (req, res) => {
    
    req.session.destroy(err => {
        if (err) {
            console.error('Logout error:', err);
            return res.json({ success: false, message: 'Logout error' });
        }
        res.json({ success: true });
    });
});

router.post('/adddepartment', (req, res) => {
    const { departmentName } = req.body;

   
    db.query('INSERT INTO Departments (Name) VALUES (?)', [departmentName], (err, result) => {
        if (err) {
            res.json({ success: false, message: 'Error happened. Please try again later' });
        } else {
            res.json({ success: true, message: 'Department added successfully' });
        }
    });
});

router.post('/adduser', (req, res) => {
    const { username, password, departmentId } = req.body;

    
    db.query('INSERT INTO Employees (Username, Password, DepartmentID) VALUES (?, ?, ?)', [username, password, departmentId], (err, result) => {
        if (err) {
            res.json({ success: false, message: 'Error happened. Please try again later' });
        } else {
            res.json({ success: true, message: 'User added successfully' });
        }
    });
});

router.post('/deleteuser', (req, res) => {
    const userId = req.body.userId;

    
    db.query('DELETE FROM Employees WHERE Id = ?', [userId], (err, result) => {
        if (err) {
            res.json({ success: false, message: 'Error happened. Please try again later' });
        } else {
            res.json({ success: true, message: 'User deleted successfully' });
        }
    });
});


router.get('/getdepartments', (req, res) => {
    const sql = 'SELECT * FROM Departments';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({ success: false, message: 'Error querying the database.' });
        }

        res.json({ success: true, departments: results });
    });
});


router.get('/getusers', (req, res) => {
    const sql = 'SELECT * FROM Employees';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({ success: false, message: 'Error querying the database.' });
        }

        res.json({ success: true, users: results });
    });
});

router.get('/getloginhistory', (req, res) => {
    const sql = 'SELECT * FROM Log';
    db.query(sql, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.json({ success: false, message: 'Error querying the database.' });
        }

        res.json({ success: true, loginHistory: results });
    });
});

module.exports = router;
