const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
    const token = req.cookies.accessToken;

    if (!token) {
        return res.redirect("/?error=" + encodeURIComponent("Unauthorized: No token provided"));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect("/?error=" + encodeURIComponent("Unauthorized: Invalid token"));
    }
};

module.exports = verifyToken;