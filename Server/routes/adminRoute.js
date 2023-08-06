const express = require("express");
const { admins, register, login, markShape } = require("../controllers/adminController");
const router = express.Router();

router.get('/', admins)
router.post('/register', register)
router.post('/login', login)
// router.post('/markPolygon', markPolygon)
// router.post('/markPolyline', markPolyline)
// router.post('/markCircle', markCircle)
// router.post('/markRectangle', markRectangle)
router.post('/markShape', markShape)

module.exports = router;
