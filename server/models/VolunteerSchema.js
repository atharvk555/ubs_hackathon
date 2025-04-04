const mongoose = require("mongoose");

const VolunteerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User schema
    required: true,
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inventory", // Reference to the Inventory schema
    },
  ]
  ,
  information:[
    {type:Object}
  ]
});

module.exports = mongoose.model("VolunteerOrders", VolunteerSchema);
