const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
// We are connecting the DB_URL from the .env file
        await mongoose.connect(process.env.DB_URL);
        console.log("🔥 MongoDB Database Connected Successfully!");
    } catch(err) {
        console.log("❌ Database Connection Failed:", err);
        process.exit(1);
    }
};

module.exports = dbConnection;