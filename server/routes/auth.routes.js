// part:1
// const express = require("express");
// const router = express.Router();
// const authController = require("../controllers/auth.controller");
// const verifyToken = require("../middleware/auth.middleware"); // Middleware to verify your token

// // http://localhost:8080/api/auth/register
// router.post("/register", authController.registerApi);

// // http://localhost:8080/api/auth/login
// router.post("/login", authController.loginApi);


// // 🆕 Secure Profile Route (verifies HttpOnly cookie)
// router.get("/me", verifyToken, authController.getProfile);

// module.exports = router;



// part:2

const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const verifyToken = require("../middleware/auth.middleware");

// Routes
router.post("/register", authController.registerApi);
router.post("/login", authController.loginApi);
router.get("/me", verifyToken, authController.getProfile);

router.post("/logout", authController.logoutApi);

module.exports = router;
