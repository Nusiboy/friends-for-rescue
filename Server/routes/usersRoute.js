const express = require("express");
const router = express.Router();
const userscontroller = require("../controllers/userController");

router.route('/add').post(userscontroller.register)
router.route('/login').post(userscontroller.login)
router.route('/edit').patch(userscontroller.update)

module.exports = router;
