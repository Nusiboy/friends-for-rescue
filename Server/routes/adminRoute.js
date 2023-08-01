const express = require("express");
const { admins, register, login, markLocation } = require("../controllers/adminController");
const router = express.Router();

router.get('/', admins)
router.post('/register', register)
router.post('/login', login)
router.post('/markLocation', markLocation)

module.exports = router;
