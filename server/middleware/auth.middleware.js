const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "Access Denied. No Token Provided!" });
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.id;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or Expired Token!" });
    }
};

module.exports = authMiddleware;

