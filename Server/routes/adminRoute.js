const express = require("express");
const { admins, register, login, markRectangle, markPolygon, markCircle, markPolyline } = require("../controllers/adminController");
const router = express.Router();

router.get('/', admins)
router.post('/register', register)
router.post('/login', login)
router.post('/markPolygon', markPolygon)
router.post('/markPolyline', markPolyline)
router.post('/markCircle', markCircle)
router.post('/markRectangle', markRectangle)

module.exports = router;
