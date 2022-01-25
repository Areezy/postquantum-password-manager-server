const mongoose = require("mongoose");

async function connectDataBase() {
  try {
    await mongoose.connect(process.env.DATABASE_CONNECTION_STRING);
    console.log("connected successfully");
  } catch (error) {
    console.log("Error Connecting to Database, Error is:", error.message);
  }
}

module.exports = connectDataBase;
