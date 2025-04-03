const mongoose= require('mongoose');
// const Donor = require('"../models/DonorSchema');
const Donor=require("../models/DonorSchema");

const bookschema = new mongoose.Schema({
     
     Name : {
        type: String , 
     }, 
     Authors : [{
         type: String , 
     }], 
     Category:{
        type:String
     },
     donors: [{ type: mongoose.Schema.Types.ObjectId, ref: "Donor" }],

     Grade_level:{
     type: Number,
     },

     Publisher : {
        type : String 
     }, 

     book_image_url:{
      type : String , 
     }
     
})


// Creating a Mongoose model
const Book = mongoose.model("Book", bookschema);
module.exports = Book;
