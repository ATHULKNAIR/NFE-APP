const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName : {
        type : String,
        required : [true,"Please enter Product name"],
        trim:true
    },  

});

module.exports = mongoose.model('Product',productSchema);