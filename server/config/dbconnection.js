const mongoose = require("mongoose");

// // Step:1 (compass)
// const dbConnection = async () => {
//     try {
// // We are connecting the DB_URL from the .env file
//         await mongoose.connect(process.env.DB_URL);
//         console.log("🔥 Database Connected to MongoDB Compass(localhost) Successfully!");
//     } catch(err) {
//         console.log("❌ Database Connection Failed:", err);
//         process.exit(1);
//     }
// };


// step:2 (atlas)
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