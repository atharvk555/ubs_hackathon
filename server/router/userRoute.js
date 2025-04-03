const express=require('express');
const {upload}=require("../config/multer");
const {handelRegisterUser,handelUpdateUserProfile}=require("../controllers/auth"); 
const userRoute=express.Router();
userRoute.post("/signup",handelRegisterUser);
userRoute.post("/update_profile",handelUpdateUserProfile);
// userRoute.post("/signup",handelSignup);
module.exports={userRoute};