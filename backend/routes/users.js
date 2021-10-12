const express = require('express');

const router = express.Router();
const userController = require('../controllers/userController');
const cartController = require('../controllers/cartController');
const { protect } = require('../middlewares/auth');

router.use(protect);

router.put('/updateMe', userController.updateMe);
router.put('/updateMyPassword', userController.updatePassword);

module.exports = router;
