const express = require("express")
const app = express()
const axios = require("axios")
require("dotenv").config()

const connectToMongo = require("./database/connection")
const Stock = require("./database/stockSchema")

const port = process.env.PORT || 3000
const url = "https://api.wazirx.com/api/v2/tickers"
const mongoUrl = process.env.MONGO_URL

// connect mongo database
connectToMongo(mongoUrl)

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(url)
    const { data } = result

    const stocks = Object.keys(data).slice(0, 10)

    const dataToShow = stocks.map(stock => {
      const { name, last, buy, sell, volume, base_unit } = data[stock]

      return ({
        name,
        last,
        buy,
        sell,
        volume,
        base_unit,
      })
    })

    await Stock.create(dataToShow)

    res.redirect("/show")

  } catch (error) {
    res.send({ "error": "NO url data" })
    console.log(error)
  }
})

app.get("/show", (req, res) => {
  res.send("show")
})

app.listen(port, (req, res) => {
  console.log(`server running on port ${port}`)
})