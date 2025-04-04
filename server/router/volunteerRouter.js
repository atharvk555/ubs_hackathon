const express= require('express');
const VolunteerRouter = express.Router();
const {otpgeneration,verifyOTP,changeOrderStatus}= require('../controllers/volunteer');

VolunteerRouter.post('/generate_otp' ,otpgeneration );
VolunteerRouter.post('/verify_otp' ,verifyOTP );
VolunteerRouter.post("/change_order_status",changeOrderStatus);
// VolunteerRouter.post("/order/complete/",otpgeneration);
module.exports= {VolunteerRouter};