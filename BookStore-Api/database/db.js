const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(
        "mongodb+srv://samrendrak882:Guddu%402001@cluster0.mayyh.mongodb.net/"
    );
    console.log("mongodb is connected successfully !");
  } catch (error) {
    console.error("Mongodb connection failed", error);
    process.exit(1);
  }
};

module.exports = connectToDB;

// If your mongoDb password contains special characters, encode them using percent-encoding (URL encoding).
// For example:
// @ becomes %40
// / becomes %2F
// ? becomes %3F
// : becomes %3A