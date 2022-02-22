const express = require('express');
const router = express.Router();
const {login, register, getMe} = require('../contorllers/authController');


router.post("/login", login);

router.post("/register", register);

router.post("/me", getMe);



module.exports = router;