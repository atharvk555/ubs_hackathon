const mongoose=require('mongoose');
const StoreSchema = new mongoose.Schema({
    address: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    inventory: [
        {type:mongoose.Schema.Types.ObjectId, ref: "BookInventory"}
    ]
  }, { timestamps: true });
  
module.exports = mongoose.model("Store", StoreSchema);
