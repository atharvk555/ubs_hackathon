const express=require('express');
const Store=require("../models/storeSchema");
// const BookInventory=require("../models/BookInventorySchema");
const Requests=require("../models/requestSchema");
const createStore = async (req, res) => {
    try {
      const { address, latitude, longitude } = req.body;
      console.log(address,latitude,longitude);
      if (!address || latitude === undefined || longitude === undefined) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }
  
      const store = new Store({ address, latitude, longitude, inventory: [] });
      await store.save();
  
      res.status(201).json({ success: true, store });
    } catch (err) {
      res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
  };
  const ProceedRequest=async(req,res)=>{
    try{
      const {request_id}=req.body;
      if(!request_id){
          return res.status(500).json({
              succes:false,
              message:"All fileds are required",
          })
      }
      await Requests.findByIdAndUpdate(request_id,{status:"Approved"});
      return res.status(200).json({
        message:"Request Approved successfully",
      })
    }
    catch(err){
      return res.status(500).json({
        message:err.message
      })
    }

  }
  const storeRoute=express.Router();
  storeRoute.post("/create-store",createStore);
  storeRoute.post("/procees_request",ProceedRequest);
  // userRoute.post("/signup",handelSignup);
  module.exports={storeRoute};