const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const farmerCtrl = require('../controllers/farmerCtrl');

router.post('/register',farmerCtrl.register);
router.post('/login',farmerCtrl.login);
router.get('/logout',auth,farmerCtrl.logout);


module.exports = router;