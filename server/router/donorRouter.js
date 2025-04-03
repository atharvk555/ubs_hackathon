const express=require('express');
const {addBookToInventory,createDoner}=require("../controllers/donor");
const donorRouter=express.Router();
const {verifyToken}=require("../middleware/auth");
donorRouter.post("/add_book",verifyToken,addBookToInventory);
module.exports={donorRouter};