const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Database connected successfully");
    } catch (error) {
        console.error("❌ Error connecting to the database:", error);
        process.exit(1); // Exit process on failure
    }
};

module.exports = { dbConnect };
