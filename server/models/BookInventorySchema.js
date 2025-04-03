const mongoose = require("mongoose");
const BookInventorySchema = new mongoose.Schema({
  book: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Book", 
    required: true 
  },
  numberOfCopies: { 
    type: Number, 
    required: true, 
    min: 1 
  },
  condition: { 
    type: Number, 
    enum:[1,2,3,4,5,6,7,8,9,10],
    required: true 
  },
  images:{
    type:String,
  },
  addedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Donor", 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model("BookInventory", BookInventorySchema);
