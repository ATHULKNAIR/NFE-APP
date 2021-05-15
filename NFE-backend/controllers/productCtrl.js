const Product = require('../models/productModel');

const ProductCtrl = {

    registerProduct : async (req,res)=>{
        try {
            const newProduct = new Product({
                productName
            });

            await newProduct.save();
            res.json({msg:"Registration successfull"})
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
     },

    getProductInfo : async (req,res)=>{
        try {
            const product  = await Product.findById(req.user.id);
            res.json({product});
        } catch (err) {
            res.status(500).json({msg:err.message});
        }
    },

    editProduct : async (req,res)=>{
        try {
            const {product} = req.body;
            if(!product){
                return res.status(400).json({msg:"Please fill all fileds"});
            }
            await Product.findOneAndUpdate({_id:req.user.id},{
                 product
            })
                res.json({msg:"Updated..!"});
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    },
    deleteProduct : async (req,res)=>{
        try {
            await Product.findByIdAndDelete(req.params.id);
            res.json({msg:"Deleted Product"});
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    }
}
 
module.exports = ProductCtrl;