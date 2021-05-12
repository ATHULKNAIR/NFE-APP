const Farmer = require('../models/farmerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const farmerCtrl = {

    register : async (req,res)=>{
        try {
            const {name,phoneNo,password
                // ,gender,location,photo
            } = req.body;
            
            const farmer = await Farmer.findOne({phoneNo});
            if(farmer){
                return res.status(400).json({msg:"Phone no. already exists"})
            }
            if(password.length<6){
                return res.status(400).json({msg:"Password length too short"})
            }
            const passwordHash = await bcrypt.hash(password,10);
            const newFarmer = new Farmer({
                name,phoneNo,password:passwordHash,
                // gender,location,photo
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

            res.cookie('refreshtoken',refreshtoken,{
                httpOnly : true,
                path : '/buyer/refreshtoken',
                maxAge : 7*24*60*60*1000
            });

            res.json({accesstoken});
            
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    },
    
     logout : async (req,res)=>{
        try {
            res.clearCookie('refreshtoken',{
                path : '/buyer/refreshtoken'
            })
            return res.json({msg:"Logged Out"})
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    },
    getBuyerInfor : async (req,res)=>{
        try {
            const farmer  = await Farmer.findById(req.user.id).select("-password");
            res.json({farmer });
        } catch (err) {
            res.status(500).json({msg:err.message});
        }
    },
    getUsersAllInfor : async (req,res)=>{
        try {
            const user = await Buyer.find().select("-password");
            res.json(user);
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    },

    // editFarmer : async (req,res)=>{
    //     try {
    //         const {name}
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



