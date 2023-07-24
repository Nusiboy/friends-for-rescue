const express = require("express");
const { users, register, login } = require("../controllers/userController");
const router = express.Router();

router.get('/', users)
router.post('/register', register)
router.post('/login', login)

module.exports = router;
