const mongoose = require("mongoose");

const DonorSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  },
  booksDonated: { 
    type: Number, 
    default: 0 
  },
  certificateLink: { 
    type: String 
  },
  bookInventory: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "BookInventory" 
  }]
}, { timestamps: true });

module.exports = mongoose.model("Donor", DonorSchema);
