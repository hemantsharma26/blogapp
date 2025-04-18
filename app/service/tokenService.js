const jwt = require('jsonwebtoken');

class TokenService {
    async generateAccessToken(payload) {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '15m' });
    };

    async generateRefreshToken(payload) {
        return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
    };

    async verifyToken(token, secret) {
        return jwt.verify(token, secret);
    };
}

module.exports = new TokenService();