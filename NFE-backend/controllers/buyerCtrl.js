const Buyer = require('../models/buyerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const buyerCtrl = {

    register : async (req,res)=>{
        try {
            const {name,email,password
                // ,phoneNo,gender,location,photo
            } = req.body;
            

            if(!validateEmail(email)){
                return res.status(400).json({msg:"Invalid email"})
            }

            const buyer = await Buyer.findOne({email});
            if(buyer){
                return res.status(400).json({msg:"Email already exists"})
            }
            if(password.length<6){
                return res.status(400).json({msg:"Password length too short"})
            }
            const passwordHash = await bcrypt.hash(password,10);
            const newBuyer = new Buyer({
                name,email,password:passwordHash
                // ,phoneNo,gender,location,photo
            });

             await newBuyer.save();

            res.json({msg:"Registration successfull"})
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
     },

     login : async (req,res)=>{
         try {
             const {email,password} = req.body;
             const buyer = await Buyer.findOne({email});
             if(!buyer){
                 res.status(400).json({msg:"User doesnot exist"})
             }
             const isMatch = await bcrypt.compare(password,buyer.password);
             if(!isMatch){
                 res.status(400).json({msg:"Incorrect Password !"})
             }

             const accesstoken = createAccessToken({id : buyer._id});
             const refreshtoken = createRefreshToken({id : buyer._id});

             res.cookie('refreshtoken',refreshtoken,{
                 httpOnly : true,
                 path : '/buyer/refreshtoken',
                 maxAge : 7*24*60*60*1000
             });

             res.json({accesstoken});
         } catch (err) {
             res.status(500).json({msg:err.message})
         }
     },

     logout : async (req,res)=>{
        try {
            res.clearCookie('refreshtoken',{
                path : '/buyer/refreshtoken'
            })
            return res.json({msg:"Logged Out"})
            
        } catch (err) {
          return res.status(500).json({msg:err.message})
        }
    },

    getBuyerInfor : async (req,res)=>{
        try {
            const buyer  = await Buyer.findById(req.user.id).select("-password");
            res.json({buyer });
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
    editBuyer : async (req,res)=>{
        try {
            const {name,photo,product} = req.body;
            if(!name || !photo || !product){
                return res.status(400).json({msg:"Please fill all fileds"});
            }
            await Buyer.findOneAndUpdate({_id:req.user.id},{
                name,photo,product
            })
            res.json({msg:"Updated..!"})
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    },
    deleteBuyer : async (req,res)=>{
        try {
            await Buyer.findByIdAndDelete(req.params.id);
            res.json({msg:"Deleted Farmer"});
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    }
    
    

}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 


const createAccessToken = (user)=>{
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'10m'})
}
const createRefreshToken = (user)=>{
    return jwt.sign(user,process.env.REFRESH_TOKEN_SECRET,{expiresIn:'7d'})
} 
module.exports = buyerCtrl;