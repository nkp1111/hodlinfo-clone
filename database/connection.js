const mongoose = require("mongoose")

const connectMongoDB = async (url) => {
  /* 
  Connect to mongo database to store data
  params url: mongo database connection url
   */
  try {
    await mongoose.connect(url)
    console.log("Mongo connected")
  } catch (error) {
    console.log("Error connection Mongo server")
    console.log(error)
  }
}

module.exports = { connectMongoDB }