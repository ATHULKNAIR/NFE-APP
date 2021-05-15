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


                //gender,location,photo

            });

            await newFarmer.save();

            res.json({msg:"Registered Successfully..!"})
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
     },

    login : async (req,res)=>{
        try {
            Farmer.findOne({phoneNo: req.body.phoneNo})
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
              var authorities = [];

              if(user.role === 0){

                authorities.push("Admin");
              }else if(user.role === 1){
                  authorities.push("Farmer")
              }
             
              res.status(200).send({
                id: user._id,
                name: user.name,
                phoneNo: user.phoneNo,
                accessToken: token,
                photo:user.photo,
                role : authorities
              });
            });
            
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    },
   
    
    getFarmerInfor : async (req,res)=>{
        try {
           
            const farmer  = await Farmer.findById(req.userId).select("-password");
            res.json({farmer });
        } catch (err) {
            res.status(500).json({msg:err.message});
        }
    },
    getUsersAllInfor : async (req,res)=>{
        try {
            const user = await Farmer.find().select("-password");
            res.json(user);
        } catch (err) {
            res.status(500).json({msg:err.message})
        }
    },

    editFarmer : async (req,res)=>{
        try {
            const {name,photo,product} = req.body;
            if(!name || !photo || !product){
                return res.status(400).json({msg:"Please fill all fileds"});
            }
            await Farmer.findOneAndUpdate({_id:req.user.id},{
                 name,photo,product
            })
                res.json({msg:"Updated..!"});
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    },
    deleteFarmer : async (req,res)=>{
        try {
            await Farmer.findByIdAndDelete(req.params.id);
            res.json({msg:"Deleted Farmer"});
        } catch (err) {
            return res.status(500).json({msg:err.message});
        }
    },
    adminBoard : (req,res)=>{
        res.status(200).json({msg:"Admin Content"})
    },
    farmerHome : (req,res)=>{
        res.status(200).json({msg:"Farmer Home"})
    }

    
}


module.exports = farmerCtrl;



