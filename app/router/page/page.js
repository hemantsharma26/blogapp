const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const message = req.query.error;
    res.render('login', { message });
});
router.get('/register', (req, res) => {
    const message = req.query.error;
    res.render('register', { message });
});
router.get('/dashboard', (req, res) => {
    res.render('dashboard', { user: req.user || {} });
});

module.exports = router;