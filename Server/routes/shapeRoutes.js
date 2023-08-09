const express = require("express");
const router = express.Router();
const shapescontroller = require("../controllers/shapescontroller");

router.route('/add').post(shapescontroller.addshape)
router.route('/take').get(shapescontroller.takeshape)
router.route('/delete/:id').delete(shapescontroller.delete)

module.exports = router;
