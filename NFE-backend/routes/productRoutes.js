const express = require('express');
const router = express.Router();
const ProductCtrl = require('../controllers/productCtrl');

router.post('/product/register',ProductCtrl.registerProduct);
router.get('/product/all_info',ProductCtrl.getProductInfo)
router.patch('/product/edit',ProductCtrl.editProduct);
router.delete('/product/delete/:id',ProductCtrl.deleteProduct);

module.exports = router;