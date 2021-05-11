const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"Please enter your name"],
        trim:true
    },
    password : {
        type : String,
        required : [true,"Please enter your password"]
    },
    phoneNo : {
        type : Number,
        required : [true,"Please enter your Phone Number"],
        unique : true
    },
    photo : {
        type : String,
        default:"https://res.cloudinary.com/mycartdb/image/upload/v1620580841/FarmerPic_ilo32n.jpg"
    },
    gender : {
        type : String
    },
    location : {
        type: String
    },
    products : {
        type : mongoose.Schema.ObjectId,
        ref  :"Product"
    }

    
});

module.exports = mongoose.model('Farmer',farmerSchema);