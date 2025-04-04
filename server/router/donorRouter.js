const express=require('express');
const {addBookToInventory,createDoner,getBookMetaData}=require("../controllers/donor");
const donorRouter=express.Router();
const {verifyToken}=require("../middleware/auth");
donorRouter.post("/add_book",verifyToken,addBookToInventory);
donorRouter.post("/get_book_info",getBookMetaData);
module.exports={donorRouter};