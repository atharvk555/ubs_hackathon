const express=require('express');
const Store=require("../models/storeSchema");
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
  const storeRoute=express.Router();
  storeRoute.post("/create-store",createStore);
  // userRoute.post("/signup",handelSignup);
  module.exports={storeRoute};