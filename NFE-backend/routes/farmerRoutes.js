const farmerCtrl = require('../controllers/farmerCtrl');
const auth = require('../middleware/auth');
const farmerAdmin = require('../middleware/farmerAdmin');

module.exports = function (app){
    app.use(function(req,res,next){
       res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"  
       );
       next();
    })

    app.post("/farmer/register",farmerCtrl.register);
    app.post("/farmer/login",farmerCtrl.login);
    app.get("/farmer/profile",auth,farmerCtrl.getFarmerInfor);
    app.patch("/farmer/profile/edit",auth,farmerCtrl.editFarmer);
    app.get("/farmer/profile/all",auth,farmerAdmin,farmerCtrl.getUsersAllInfor);
    app.get('/farmer/home',auth,farmerCtrl.farmerHome);
    app.get('/farmer/admin/home',auth,farmerAdmin,farmerCtrl.adminBoard);
}