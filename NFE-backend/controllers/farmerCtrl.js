const Farmer = require('../models/farmerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const farmerCtrl = {

    register : async (req,res)=>{
        try {
            const {username,phoneNo,password,gender,location,photo} = req.body;
            
            const farmer = await Farmer.findOne({phoneNo});
            if(farmer){
                return res.status(400).json({msg:"Phone no. already exists"})
            }
            if(password.length<6){
                return res.status(400).json({msg:"Password length too short"})
            }
            const passwordHash = await bcrypt.hash(password,10);
            const newFarmer = new Farmer({
                username,phoneNo,password:passwordHash,gender,location,photo
            });

            await newFarmer.save();

            res.json({msg:"Registered Successfully..!"})
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
     },

    login : async (req,res)=>{
        try {
            const {phoneNo,password} = req.body;
            const farmer = await Farmer.findOne({phoneNo});
            if(!farmer){
                res.status(400).json({msg:"User doesnot exist"})
            }
            const isMatch = await bcrypt.compare(password,farmer.password);
            if(!isMatch){
                res.status(400).json({msg:"Incorrect Password"})
            }

            const accesstoken = createAccessToken({id:farmer._id});
            const refreshtoken = createRefreshToken({id:farmer._id});

            res.cookie('refreshtoken',refreshtoken);

            res.json({accesstoken});
            
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    },
    
     logout : async (req,res)=>{
        try {
            res.clearCookie('refreshtoken')
            return res.json({msg:"Logged Out"})
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    },
    // register : async (req,res)=>{
    //     try {
            
    //     } catch (err) {
    //         return res.status(500).json({msg:err.message});
    //     }
    // },register : async (req,res)=>{
    //     try {
            
    //     } catch (err) {
    //         return res.status(500).json({msg:err.message});
    //     }
    // },register : async (req,res)=>{
    //     try {
            
    //     } catch (err) {
    //         return res.status(500).json({msg:err.message});
    //     }
    // },
}
 
const createAccessToken = (user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
}
const createRefreshToken = (user)=>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn : '7d'})
}

module.exports = farmerCtrl;



