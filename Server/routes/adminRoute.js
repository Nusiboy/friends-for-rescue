const express = require("express");
const { admins, register, login } = require("../controllers/adminController");
const router = express.Router();

router.get('/', admins)
router.post('/register', register)
router.post('/login', login)

module.exports = router;
