const mongoose = require("mongoose");

// Use environment variable or fallback to local MongoDB
const DB = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/NextdayFoodKitchen";

const isProduction = process.env.NODE_ENV === "production";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    autoIndex: false
  })
  .then(() => console.log("MongoDB connected successfully"))
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit process if database connection fails
  });

module.exports = mongoose.connection;
