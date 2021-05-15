const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload')

mongoose.connect(process.env.DATABASE_URL,{
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useFindAndModify: false
},()=>{
    console.log("Database Connected..!")
})

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
    useTempFiles: true
}))

app.use('/farmer',require('./routes/farmerRoutes'));   
app.use('/buyer',require('./routes/buyerRoutes'));   
app.use('/product',require('./routes/productRoutes'));
app.use('/upload',require('./routes/upload'));
app.listen(5000,()=>{
    console.log("Listening to port 5000")
});
