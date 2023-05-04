const mongoose = require("mongoose")

const connectMongoDB = (url) => {
  /* 
  Connect to mongo database to store data
  params url: mongo database connection url
   */
  mongoose.connect(url)
    .then(() => {
      console.log("Mongo server is running")
    })
    .catch((err) => {
      console.log("Error connection Mongo server")
      console.log(err)
    })
}

module.exports = connectMongoDB