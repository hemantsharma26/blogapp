const bcrypt = require('bcryptjs');
const User = require('../../model/user');
const userToken = require('../tokenService');

class AuthService {
    async register({ email, password, profileImage }) {
        const existing = await User.findOne({ email });
        if (existing) throw new Error('User already exists');

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            email,
            password: hashedPassword,
            profileImage: profileImage || null,
        });

        await user.save();
        return { message: 'User registered successfully' };
    }

    async login({ email, password }) {
        const user = await User.findOne({ email });
        if (!user) throw new Error('Invalid email');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid passwords');

        const payload = { _id: user._id, email: user.email };
        const accessToken = await userToken.generateAccessToken(payload);
        const refreshToken = await userToken.generateRefreshToken(payload);

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };
    }
}

module.exports = new AuthService();