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
            Buyer.findOne({email: req.body.email})
            .exec((err, user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!user) {
                return res.status(404).send({ message: "User Not found." });
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
                });
            }

            var token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: 86400 // 24 hours
            });

            
            res.status(200).send({
                id: user._id,
                username: user.username,
                email: user.email,
                accessToken: token
            });
            });
         } catch (err) {
             res.status(500).json({msg:err.message})
         }
     },

    getBuyerInfor : async (req,res)=>{
        try {
            const buyer  = await Buyer.findById(req.user.id).select("-password");
            res.json(buyer.name);
        } catch (err) {
            res.status(500).json({msg:err.message});
        }
    },

    getUsersAllInfor : async (req,res)=>{
        try {
            const buyer = await Buyer.find().select("-password");
            res.json(buyer);
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    },
   
    editBuyer : async (req,res)=>{
        try {
            const {name,photo,product} = req.body;
            // if(!name || !photo || !product){
            //     return res.status(400).json({msg:"Please fill all fileds"});
            // }
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

module.exports = buyerCtrl;