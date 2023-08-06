const express = require("express");
const router = express.Router();
const markscontroller = require("../controllers/markController");

router.route('/add').post(markscontroller.addmark)
// router.route('/login').post(markscontroller)
// router.route('/edit').patch(markscontroller)

module.exports = router;
