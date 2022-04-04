const express = require('express');
const router = express.Router();
const {login, register, getMe, googleAuth} = require('../contorllers/userController');
const protect = require('../middleware/authMiddleware');


router.post("/login", login);

router.post("/register", register);

router.post("/auth/google", googleAuth);

router.post("/me",protect, getMe);



module.exports = router;