const Book = require('../Model/bookschema');
const Store=require("../models/storeSchema");
const mongoose=require('mongoose');
// const Donors= require('../Model/Donor');
const axios = require("axios");
const Requests=require('../models/requestSchema');

const getBooks = async (req, res) => {

    try {

      const { Name, Publisher, Authors, current_address } = req.body;
    //   const coords = await getLatLonFromAddress(current_address);
    //   console.log(coords); // { lat: 28.6139, lon: 77.2090 }

      let filter = {}; // Initialize empty filter
     const val=haversineDistance(18.552477725130302, 73.95322689565462 , 18.463706959191114, 73.83240816681638);
     console.log(val);
    
     if (Name) {
        filter.Name = { $regex: Name, $options: "i" };
    }
    if (Publisher) {
        filter.Publisher = { $regex: Publisher, $options: "i" };
    }
    if (Authors) {
        filter.Authors = { $in: Authors.split(",") };
    }
     const books = await Book.find(filter);
      return res.send(books); 

    } catch (err) {
      res.status(500).json({ message: err.message });
    }

  };

  const getallbooks = async(req,res)=>{
     
    const books = Book.find({});
    return res.send( books)
  }

  const create_request = async(req, res)=>{
     
    try{
    const {Inventory_id,School_id,Store_id}= req.body;
    const newrequest = new Requests({
        InventoryId:Inventory_id,
        StoreId:School_id,
        School_id:Store_id,
        status:"Pending",
        request_Date: Date.now(),
        expire_Date :new Date(Date.now() + 7*24*60* 60 * 1000),
    })
    await newrequest.save();
    res.send({
         message: " Succesfully created the request ",
         newrequest
    });
} 
  catch(err){
    return res.send({
        message : err.message
    })
  }
  }

const getLatLonFromAddress = async (address) => {

    try {

        const apiKey = ""; // Replace with your API key
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
        
        const response = await axios.get(url);

        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            return { lat: location.lat, lon: location.lng };
        } else {
            throw new Error("Invalid location or API error");
        }
    } catch (error) {
        console.error("Error fetching coordinates:", error.message);
        return null;
    }
};


const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180; // Convert degrees to radians
    const R = 6378; // Radius of Earth in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
};

const bookSearchInStore = async (req, res) => {
    try {
      const { bookId ,long,lat} = req.body; // Get bookId from request
      if (!bookId) {
        return res.status(400).json({ success: false, message: "Book ID is required" });
      }

      if (!long || !lat || isNaN(long) || isNaN(lat)) {
        return res.status(400).json({
            success: false,
            message: "Valid longitude and latitude are required",
            error: "INVALID_COORDINATES"
        });
    }

  
      const objectId = new mongoose.Types.ObjectId(bookId); // Convert string to ObjectId
  
      // Find all stores with inventory and populate inventory details
      const stores = await Store.find({ inventory: { $exists: true, $ne: [] } }).populate("inventory");
  
      // Filter stores where at least one inventory item has the given bookId
      const matchingStores = stores.filter(store =>
        store.inventory.some(inv => inv.book.toString() == bookId)
      );
    //   i want to modify the store here----------
    // console.log(long,lat);
    const storesWithDistance = matchingStores.map(store => {
        const storeLat = store?.latitude ;
        const storeLong= store?.longitude ;
        const distance = haversineDistance (
            parseFloat(lat),
            parseFloat(long),
            parseFloat(storeLat),
            parseFloat(storeLong)
        );
        
        return {
            ...store._doc,
            distance: parseFloat(distance.toFixed(3)), // Round to 2 decimal places
            distanceUnit: 'km'
        };}
    )
    storesWithDistance.sort((a, b) => a.distance - b.distance);

    //   ----------------------------------
      return res.status(200).json({ success: true, stores: storesWithDistance });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
  };

module.exports = {getBooks,create_request,getallbooks,bookSearchInStore};