const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// http://localhost:8080/api/auth/register
router.post("/register", authController.registerApi);

// http://localhost:8080/api/auth/login
router.post("/login", authController.loginApi);

module.exports = router;