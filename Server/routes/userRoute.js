const express = require("express");
const { users, register, login, updateUser } = require("../controllers/userController");
const router = express.Router();

router.get('/', users)
router.post('/register', register)
router.post('/login', login)
router.patch('/updateUser/:id', updateUser)

module.exports = router;
