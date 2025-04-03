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
    type: String, 
    enum: ["New", "Like New", "Good", "Fair", "Poor"], 
    required: true 
  },
  addedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
}, { timestamps: true });

module.exports = mongoose.model("BookInventory", BookInventorySchema);
