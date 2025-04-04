const express=require('express');
const {upload}=require("../config/multer");
const {handelRegisterUser,handelUpdateUserProfile,handelSignIn,AcceptOrder,GetVolunteerOrders,sendRequestToALLNearby}=require("../controllers/auth"); 
const userRoute=express.Router();
const {verifyToken}=require("../middleware/auth");
userRoute.post("/signin",handelSignIn)
userRoute.post("/signup",handelRegisterUser);
userRoute.put("/update_profile",verifyToken,handelUpdateUserProfile);
// userRoute.post("/signup",handelSignup);
userRoute.post("/orders/accept",verifyToken,AcceptOrder);
userRoute.get("/volunteer/my-orders",verifyToken,GetVolunteerOrders);
userRoute.post("/getEmailToDonor",verifyToken,sendRequestToALLNearby);
module.exports={userRoute};