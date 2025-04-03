const mongoose = require('mongoose');
// const School = require('../Model/School');

const requestschema= new mongoose.Schema({
     InventoryId:{
        type:mongoose.Schema.Types.ObjectId, ref: "Inventory"
     },
     StoreId:{
        type:mongoose.Schema.Types.ObjectId, ref: "Store"
     },
     School_id:{
        type: mongoose.Schema.Types.ObjectId, ref: "School"
     },
     status:{
        type:String,
     },
     success_image:{
        type:String,
     },
     request_Date:{
        type:Date
     },
     expire_Date:{
        type : Date
     }
})

module.exports=mongoose.model('Requests', requestschema);