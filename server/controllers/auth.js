const User = require("../models/UserSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const VolunteerOrders=require("../models/VolunteerSchema");
const Requests=require("../models/requestSchema");
const { GiConsoleController } = require("react-icons/gi");
const SECRET_KEY = process.env.JWT_SECRET;
const handelSignIn=async (req, res) => {
    try{
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
  
    const token =jwt.sign({ _id: user.id, email: user.email, role: user.role }, SECRET_KEY, {
      expiresIn: "48h",
    });
  
    return res.status(200).json({ user,token });
  }catch(err){
    return res.status(500).json({ message: "Server error", error });
  }
}
const handelRegisterUser = async (req, res) => {
    try {
      const { email, password, role } = req.body;
      console.log(email,password,role);
  
      if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, password, and role are required" });
      }
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const user = new User({
        email,
        password: hashedPassword,
        role
      });
  
      await user.save();
      res.status(201).json({ message: "User registered successfully", user });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  const handelUpdateUserProfile = async (req, res) => {
    try {
      // Extract user ID from token (authentication middleware needed)
      const { uId,name, phoneNumber, address } = req.body;
      console.log(uId,name,phoneNumber,address);
      const userId = req?.user?.id||uId;
     console.log(name,phoneNumber,address);
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { name, phoneNumber, address },
        { new: true, runValidators: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  // contollers for orders
  const AcceptOrder = async (req, res) => {
    try {
      const user_id = req.user.id;
      const { orderId,order } = req.body;
      console.log(order);
      // console.log(user_id,orderId)
      if (!orderId) {
        return res.status(400).json({ message: "Order ID is required" });
      }
  
      // Check if the user already has an entry in VolunteerOrders
      let volunteerOrder = await VolunteerOrders.findOne({ userId: user_id });
      console.log(volunteerOrder)
  
      if (volunteerOrder) {
        // Append the new order ID if it's not already in the array
        if (!volunteerOrder.orders.includes(orderId)) {
          volunteerOrder.orders.push(orderId);
          volunteerOrder.information.push(order);
          await volunteerOrder.save();
        }
      } else {
        // Create a new entry if userId is not present
        volunteerOrder = new VolunteerOrders({
          userId: user_id,
          orders: [orderId],
          information:[order],
        });
        await volunteerOrder.save();
      }
      const abc=await Requests.findByIdAndUpdate(
         orderId,
        { status: "approved" }
      );
      return res.status(200).json({ success:true,message: "Order accepted successfully"});
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success:false,message: "Internal Server Error" });
    }
  };
  const GetVolunteerOrders=async(req,res)=>{
    try{
      const userId=req.user.id;
      const orders=await VolunteerOrders.find({userId:userId});
      const informationArray = orders.flatMap(order => order.information); 

      // console.log(informationArray); 

      return res.status(200).json({
        success: true,
        information: informationArray, // Return the extracted information
      });
    }catch(err){
      console.log(err.message);
      return res.status(500).json({
        success:false,
        message:err.message
      })
    }
  }

const Donor=require("../models/DonorSchema")
  const sendRequestToALLNearby = async (req, res) => {
    try {
      const email=req.user.email;
      const req_data=req.body;
      console.log(email,req_data);
      // 1. Find the school
      
  
        // Find all users with role "donor" and select only the email field
      const donors = await User.find({ role: "donor" }).select("email");

        // Extract emails from the response
      const emails = donors.map(donor => donor.email);
     


      if (emails.length === 0) {
        return res.status(404).json({ 
          success: false, 
          message: "No active donors found" 
        });
      }
  
      const nearbyDonors = emails;
  
  
      // 4. Send emails to nearby donors
      const emailResults = await Promise.allSettled(
        nearbyDonors.map(donor => {
          const mailOptions = {
            from: `"Books4All" <${process.env.EMAIL_USERNAME}>`,
            to: donor.email,
            subject: `Book Donation Request`,
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px;">
                <h2 style="color: #2c3e50;">Book Donation Request</h2>
                <p>Dear Donor,</p>
                
                <p>The school is particularly interested in the following books:</p>
  
    
                
                <a href="${process.env.APP_URL}/donate/"
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
  
      return res.send({
        success: true,
        message: "All messages sent successfully",
        results: emailResults
      });
  
    } catch (error) {
      console.error("Error in sendAllRequestToNearby:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === 'development' ? error.message : null
      });
    }
  }; 
module.exports={handelRegisterUser,handelUpdateUserProfile,handelSignIn,AcceptOrder,GetVolunteerOrders,sendRequestToALLNearby};
