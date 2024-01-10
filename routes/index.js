// index.js

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (req.session.loggedin) {
        res.redirect('/dashboard');
    } else {
        res.render('index.ejs');
    }
});

router.get('/dashboard', (req, res) => {
    if (req.session.loggedin) {
        res.render('dashboard.ejs');
    } else {
        res.redirect('/');
    }
});

router.get('/loginHistory', (req, res) => {
    if (req.session.loggedin) {
        res.render('loginHistory.ejs');
    } else {
        res.redirect('/');
    }
});

module.exports = router;
