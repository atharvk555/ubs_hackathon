const mongoose = require('mongoose');
// const School = require('../Model/School');
const { request } = require('../router/schoolRouter');

const requestschema= new mongoose.Schema({
     
     Name : {
        type : String , 
     }, 
     Authors : {
        type : {type : String }
     },
     Publisher :{
         type : String 
     },
     Quantity  : {
        type : Number ,
     },
     school_id:{
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

const requests=mongoose.model('Requests', requestschema);
module.exports = request;