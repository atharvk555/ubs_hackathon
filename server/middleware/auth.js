const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET;
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    try {
        // console.log(token,SECRET_KEY);
        if (!token) return res.status(401).json({ message: "Access denied" });    
      const verified = jwt.verify(token, SECRET_KEY);
      req.user = { id: verified._id, email: verified.email, role: verified.role };
      next();
    } catch (err) {
      res.status(400).json({ message: "Invalid token" });
    }
  };
  
  module.exports = { verifyToken };
  