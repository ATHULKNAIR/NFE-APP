const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');

const farmerCtrl = require('../controllers/farmerCtrl');

router.post('/register',farmerCtrl.register);
router.post('/login',farmerCtrl.login);
router.get('/logout',auth,farmerCtrl.logout);
router.get('/profile',auth,farmerCtrl.getFarmerInfor);
router.get('/all_infor',auth,authAdmin,farmerCtrl.getUsersAllInfor)
router.patch('/profile/edit',auth,farmerCtrl.editFarmer);
router.delete('/buyer/delete/:id',auth,authAdmin,farmerCtrl.deleteFarmer);

module.exports = router;