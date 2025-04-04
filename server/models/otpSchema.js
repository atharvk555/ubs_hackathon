const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    otp: {
        type: String,
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    },
    expiresAt: {
        type: Date,
    }

});

module.exports = mongoose.model('OTP', OTPSchema);