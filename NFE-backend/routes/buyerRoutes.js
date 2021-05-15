const buyerCtrl = require('../controllers/buyerCtrl');
const auth = require('../middleware/auth');
const buyerAdmin = require('../middleware/buyerAdmin');

module.exports = function (app){
    app.use(function(req,res,next){
       res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"  
       );
       next();
    })

    app.post("/buyer/register",buyerCtrl.register);
    app.post("/buyer/login",buyerCtrl.login);
    app.get("/buyer/profile",auth,buyerCtrl.getBuyerInfor);
    app.patch("/buyer/profile/edit",auth,buyerCtrl.editBuyer);
    app.get("/buyer/profile/all",auth,buyerAdmin,buyerCtrl.getUsersAllInfor);
    app.get('/buyer/home',auth,buyerCtrl.buyerHome);
    app.get('/buyer/admin/home',auth,buyerAdmin,buyerCtrl.adminBoard);
}