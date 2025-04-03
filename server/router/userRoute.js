const express=require('express');
const {upload}=require("../config/multer");
const {handelRegisterUser,handelUpdateUserProfile,handelSignIn}=require("../controllers/auth"); 
const userRoute=express.Router();
const {verifyToken}=require("../middleware/auth");
userRoute.post("/signin",handelSignIn)
userRoute.post("/signup",handelRegisterUser);
userRoute.post("/update_profile",verifyToken,handelUpdateUserProfile);
// userRoute.post("/signup",handelSignup);
module.exports={userRoute};