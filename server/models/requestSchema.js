const mongoose = require('mongoose');
// const School = require('../Model/School');
const { request } = require('../router/schoolRouter');

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
     request_Date:{
        type:Date
     },
     expire_Date:{
        type : Date
     }
})

module.exports=mongoose.model('Requests', requestschema);