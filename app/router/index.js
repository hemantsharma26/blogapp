const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth/auth'));
router.use('/', require('./page/page'));

module.exports = router;