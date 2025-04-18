const express = require('express');
const router = express.Router();

router.use('/', require('./pageRoutes'));
router.use('/auth', require('./authRoutes'));
router.use('/blog', require('./blogRoutes'));

module.exports = router;