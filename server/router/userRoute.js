const express=require('express');
const {upload}=require("../config/multer");
const {handelSignup}=require("../controllers/auth"); 
const userRoute=express.Router();
userRoute.post("/signup",upload.single("files"),handelSignup);
// userRoute.post("/signup",handelSignup);
module.exports={userRoute};