const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);