const mongoose = require("mongoose");

// (atlas)
const dbConnection = async () => {
    try {
// We are connecting the atlasport from the .env file
        await mongoose.connect(process.env.atlasport);
        console.log("🔥 Database Connected to MongoDB Atlas Successfully!");
    } catch(err) {
        console.log("❌ Database Connection Failed:", err);
        process.exit(1);
    }
};
module.exports = dbConnection;