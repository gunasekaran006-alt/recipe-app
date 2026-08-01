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
