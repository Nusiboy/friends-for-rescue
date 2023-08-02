const express = require("express");
const { users, register, login, updateUser, markLocation } = require("../controllers/userController");
const router = express.Router();

router.post('/', users)
router.post('/register', register)
router.post('/login', login)
router.patch('/updateUser', updateUser)
router.post('/markLocation', markLocation)

module.exports = router;
