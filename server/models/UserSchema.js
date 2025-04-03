const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { 
    type: String, 
    trim: true 
  },
  phoneNumber: { 
    type: String, 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ["donor", "school", "volunteer", "admin"], 
    required: true 
  }
  ,address:{
    type:String,
  }
  ,longitude:{
    type:String,
  },
  latitide:{
    type:String,
  }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
