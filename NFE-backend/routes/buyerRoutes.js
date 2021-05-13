const express = require('express');
const router = express.Router();
const buyerCtrl = require('../controllers/buyerCtrl');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin')


router.post('/register',buyerCtrl.register);
router.post('/login',buyerCtrl.login);
router.get('/logout',auth,buyerCtrl.logout);
router.post('/refreshtoken',buyerCtrl.getAccessToken);
router.get('/profile',auth,buyerCtrl.getBuyerInfor);
router.get('/all_infor',auth,authAdmin,buyerCtrl.getUsersAllInfor)
router.patch('/profile/edit',auth,buyerCtrl.editBuyer);
router.delete('/buyer/delete/:id',auth,authAdmin,buyerCtrl.deleteBuyer);
module.exports = router;