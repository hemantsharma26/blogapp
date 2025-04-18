const authService = require('../../service/auth/authService');

class AuthController {
    async register(req, res) {
        try {
            const { email, password } = req.body;
            const profileImage = req.file ? req.file.path : null;
            if (!email || !password || !profileImage) {
                return res.redirect(`/register?error=${encodeURIComponent("All fields are required")}`);
            }
            const result = await authService.register({ email, password, profileImage });

            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                return res.redirect('/');
            } else {
                return res.status(201).json(result);
            }
        } catch (err) {
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                return res.redirect(`/register?error=${encodeURIComponent(err.message)}`);
            } else {
                return res.status(400).json({ message: err.message });
            }
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await authService.login({ email, password });

            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                res.cookie('accessToken', result.accessToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    maxAge: 24 * 60 * 60 * 1000,
                    sameSite: 'lax',
                });
                return res.redirect('/dashboard');
            } else {
                return res.status(200).json(result);
            }
        } catch (err) {
            if (req.headers.accept && req.headers.accept.includes('text/html')) {
                return res.redirect(`/?error=${encodeURIComponent(err.message)}`);
            } else {
                return res.status(400).json({ message: err.message });
            }
        }
    }

    async getUser(req, res) {
        try {
            const user = await authService.getUserById(req.user._id);

            if (req.headers.accept && req.headers.accept.includes("text/html")) {
                return res.render("dashboard", { user });
            } else {
                return res.status(200).json({ success: true, user });
            }
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    }

}

module.exports = new AuthController();