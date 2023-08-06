const express = require("express");
const router = express.Router();
const markscontroller = require("../controllers/markController");


router.route('/add').post(markscontroller.addmark)
router.route('/take').get(markscontroller.takemark)
// router.route('/edit').patch(markscontroller)


module.exports = router;
