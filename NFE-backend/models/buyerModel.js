const mongoose = require('mongoose');

const buyerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true,"Please enter your name"],
        trim :true
    },
    email : {
        type : String,
        required : [true,"Please enter your email"],
        unique : true,
        trim : true
    },
    password : {
        type : String,
        required : [true,"Please enter your password"]
    },
    photo : {
        type : String,
        default : "https://res.cloudinary.com/mycartdb/image/upload/v1620580596/BuyerPic_kvbzkf.png"
    },
    gender : {
        type : String
    },
    location : {
        type : String
    },
    phoneNo : {
        type : Number
    },
    product : {
        type : Array,
        default : []
    },
    role : {
        type : Number,
        default : 2
    }
});

module.exports = mongoose.model('Buyer',buyerSchema);