const mongoose= require('mongoose');

const schoolschema = new mongoose.Schema({
     
     Name : {
        type: String , 
     },
     Longitude : {
        type : String 
     },
     Latitude : {
        type : String 
     }
     
})


// Creating a Mongoose model
const school = mongoose.model("Book", schoolschema);
module.exports = school;