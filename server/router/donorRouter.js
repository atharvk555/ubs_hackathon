const express=require('express');
const {addBookToInventory}=require("../controllers/donor");
const donorRouter=express.Router();
donorRouter.post("/add_book",addBookToInventory);
module.exports={donorRouter};