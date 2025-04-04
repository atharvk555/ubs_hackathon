const sendRequestToALLNearby = async (req, res) => {
    try {
      const { school_id, maxDistance = 10 } = req.body; // maxDistance in km
  
      // 1. Find the school
      const school = await School.findById(school_id);
  
      if (!school || !school.location || !school.location) {
        return res.status(404).json({ 
          success: false, 
          message: "School not found or missing location data" 
        });
      }
  
      const schoolLong = school.longitude;
      const schoolLat = school.latitude;
  
      // 2. Find all active stores
      const allStores = await Store.find({});
  
      if (allStores.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: "No active stores found" 
        });
      }
  
      // 3. Calculate distances and filter nearby stores
      const nearbyStores = allStores
        .map(store => {
          if (!store.location || !store.longitude || !store.latitude) return null;
          
          const  storeLat = store.latitude;
          const  storeLong = store.longitude;
  
          const distance = calculateDistance(
            schoolLat, 
            schoolLong, 
            storeLat, 
            storeLong
          );
          
          return { ...store._doc, distance };
        })
        .filter(store => store && store.distance <= maxDistance)
        .sort((a, b) => a.distance - b.distance);
  
      if (nearbyStores.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: `No stores found within ${maxDistance} km radius` 
        });
      }
  
      // 4. Send emails to nearby stores
      const emailResults = await Promise.allSettled(
        nearbyStores.map(store => {
          const mailOptions = {
            from: `"Books4All" <${process.env.EMAIL_USERNAME}>`,
            to: store.email,
            subject: `Book Donation Request from ${school.name}`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2 style="color: #2c3e50;">Book Donation Request</h2>
                <p>Dear 'Store Manager',</p>
                
                <div style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
                  <p><strong>${school.name}</strong> needs book donations!</p>
                  <p><strong>Distance from your store:</strong> ${store.distance.toFixed(3)} km</p>
                  <p><strong>School Address:</strong> ${school.address}</p>
                  <p><strong>Contact:</strong> ${school.email || 'N/A'}</p>
                </div>
                
                <p>They're particularly interested in:</p>
                <ul>
                 
                </ul>
                
                <a href="${process.env.APP_URL}/donate/${school?._id}/${store?._id}"
                   style="display: inline-block; background: #3498db; color: white; 
                          padding: 10px 20px; margin: 15px 0; border-radius: 5px; 
                          text-decoration: none;">
                  Respond to Request
                </a>
                
                <p style="font-size: 12px; color: #7f8c8d;">
                  This request expires in 7 days.
                </p>
              </div>
            `
          };
          return transporter.sendMail(mailOptions);
        })
      );
  
      
      
  
    } catch (error) {
      console.error("Error in sendAllRequestToNearby:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? error.message : null
      });
    }
  };


  // const School = require('../Model/schoolSchema'); // Assuming you have a School model
  const otpGenerator = require("otp-generator");
  const nodemailer = require("nodemailer");
  const OTP = require("../models/otpSchema"); // You'll need to create this model
const User=require("../models/UserSchema");
  
  // Create a transporter for nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail", // or your email service
    auth: {
      user: process.env.EMAIL_USERNAME, // your email
      pass: process.env.EMAIL_PASSWORD, // your email password or app password
    },
  });
  
  const otpgeneration = async (req, res) => {
  
    try {
      // this is the school_email 
      console.log(req.body);
      const { address } = req.body;
      const user=await User.findOne({address:address});
      if(!user){
        return res.status(500).json({
            message:"Error in otp"
        })
      }
        console.log(user);
        const email=user?.email;
      // Validate email format
    //   if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    //     return res.status(400).json({
    //       success: false,
    //       message: "Valid email is required",
    //       error: "INVALID_EMAIL_FORMAT",
    //     });
    //   }
      console.log(email);
      // Check for recent OTP requests (prevent spam)
      const recentOTP = await OTP.findOne({
        email,
        createdAt: { $gt: new Date(Date.now() - 1 * 60 * 1000) }, // 1 minute cooldown
      });
  
      if (recentOTP) {
        return res.status(429).json({
          success: false,
          message: "Please wait before requesting another OTP",
          error: "OTP_REQUEST_LIMIT",
          retryAfter: Math.ceil(
            (recentOTP.createdAt.getTime() + 60000 - Date.now()) / 1000
          ),
        });
      }
  
      // Generate a 6-digit numeric OTP
      const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: false,
        upperCaseAlphabets: false,
        specialChars: false,
      });
  
      // Save OTP to database
      console.log("OTP",otp);
      const otpRecord = new OTP({
        email,
        otp,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes expiration
        ipAddress: req.ip, // Track request source
      });
  
      await otpRecord.save();
  
      // Email options
      const mailOptions = {
        from: `"Books4all" <${process.env.EMAIL_USERNAME}>`,
        to: email,
        subject: "Your One-Time Password (OTP)",
        text: `Your verification code is: ${otp}\n\nThis code will expire in 15 minutes.`,
        html: `
                  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                      <h2 style="color: #2563eb;">Your Verification Code</h2>
                      <p style="font-size: 16px;">Use the following OTP to complete your verification:</p>
                      <div style="background: #f3f4f6; padding: 20px; text-align: center; margin: 20px 0;">
                          <strong style="font-size: 24px; letter-spacing: 2px;">${otp}</strong>
                      </div>
                      <p style="font-size: 14px; color: #6b7280;">
                          This code will expire in 15 minutes. If you didn't request this, please ignore this email.
                      </p>
                  </div>
              `,
      };
  
      // Send email
      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          console.error("Email send error:", error);
          // Clean up the saved OTP if email failed
          await OTP.deleteOne({ _id: otpRecord._id });
  
          return res.status(500).json({
            success: false,
            message: "Failed to send OTP email",
            error: "EMAIL_SEND_FAILED",
            systemError:
              process.env.NODE_ENV === "development" ? error.message : undefined,
          });
        }
  
        console.log(`OTP sent to ${email}`, {
          messageId: info.messageId,
          timestamp: new Date(),
        });
  
        return res.status(200).json({
          success: true,
          message: "OTP sent successfully",
          details: {
            destination: email,
            expiresAt: otpRecord.expiresAt,
            deliveryTime: new Date(),
          },
          // Never include the OTP in the response
          meta: {
            hint: "Check your email for the OTP code",
          },
        });
      });
    } catch (error) {
      console.error("OTP generation error:", {
        error: error.message,
        stack: error.stack,
        timestamp: new Date(),
      });
  
      res.status(500).json({
        success: false,
        message: "Internal server error during OTP generation",
        error: "SERVER_ERROR",
        systemError:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  };
  const verifyOTP = async (req, res) => {

    try {
      const { email, otp } = req.body;
      console.log(email,otp);
      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required" });
      }
  
      // Find the most recent OTP for this email
      const otpRecord = await OTP.findOne({
        email,
        expiresAt: { $gt: new Date() }, // Check if OTP is not expired
      }).sort({ createdAt: -1 });
      
      
      if (!otpRecord) {
        return res.status(400).json({ message: "OTP expired or not found" });
      }
  
      // Compare OTPs
      if (otpRecord.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
  
      // OTP is valid - you might want to mark it as used here
    //   await OTP.deleteMany({ email }); // Clean up old OTPs for this email
    //   const school_id = await School.find({email: email});
  
    //   const updatedRequest = await Request.findByIdAndUpdate(
    //       school_id,
    //       {
    //         status: "accepted",
    //         volunteer: volunter_id, // Add volunteer ID
    //       },
    //       { new: true } // Return the updated document
    //     );
      
  
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully and Book Delivered ",
        // updatedRequest
      });
  
    } catch (error) {
      console.error("Error verifying OTP:", error);
      res.status(500).json({ message: "Server error while verifying OTP" });
    }
  
  };
const Request=require("../models/requestSchema");
async  function changeOrderStatus(req,res){
    try{
        const {confirmOrderId}=req.body;
        const response=await Request.findByIdAndUpdate(confirmOrderId,{status:"completed"});
        return res.status(200).json({
            succces:true,
            response
        })
    }
    catch(err){
        return res.status(500).json({
            err
        })
    }
}
module.exports={otpgeneration,verifyOTP,changeOrderStatus};