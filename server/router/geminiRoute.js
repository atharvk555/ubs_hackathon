const express=require('express');
const {upload}=require("../config/multer");
const {main}=require("../gen_ai/gemini_flask");
const geminiRoute=express.Router();
geminiRoute.post("/text",main);
// userRoute.post("/signup",handelSignup);
module.exports={geminiRoute};