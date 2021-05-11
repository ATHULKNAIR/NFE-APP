const express = require('express');
const router = express.Router();
const buyerCtrl = require('../controllers/buyerCtrl');
const auth = require('../middleware/auth');


router.post('/register',buyerCtrl.register);
router.post('/login',buyerCtrl.login);
router.get('/logout',auth,buyerCtrl.logout);

module.exports = router;