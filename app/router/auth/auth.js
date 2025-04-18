const express = require('express');
const router = express.Router();
const authController = require('../../controller/auth/authController');
const upload = require('../../utils/imageUpload');

router.post('/register', upload.single('profileImage'), authController.register)
    .post('/login', authController.login)

module.exports = router;