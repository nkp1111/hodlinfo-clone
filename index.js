const express = require("express")
const app = express()
const axios = require("axios")
require("dotenv").config()
const path = require("path")

const connectToMongo = require("./database/connection")
const Stock = require("./database/stockSchema")

const port = process.env.PORT || 3000
const url = "https://api.wazirx.com/api/v2/tickers"
const mongoUrl = process.env.MONGO_URL
const allQuoteUnits = ["inr"]

// app configuration
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))

// connect mongo database
connectToMongo(mongoUrl)

app.get("/", async (req, res) => {
  // get stock data from api and store stock data in database
  try {
    const result = await axios.get(url)
    const { data } = result
    let firstBaseUnit

    const stocks = Object.keys(data)

    const dataToShow = stocks.map(stock => {
      const { name, last, buy, sell, volume, base_unit, quote_unit } = data[stock]

      if (allQuoteUnits.includes(quote_unit)) {

        if (!firstBaseUnit) {
          firstBaseUnit = base_unit.toUpperCase() + "-" + quote_unit.toUpperCase()
        }

        return ({
          name,
          last,
          buy,
          sell,
          volume,
          base_unit,
        })
      } else {
        return null
      }
    }).filter(item => item)

    await Stock.create(dataToShow)

    res.redirect(`/${firstBaseUnit || "BTC-INR"}`)

  } catch (error) {
    res.send({ "error": "No url data" })
    console.log(error)
  }
})

app.get("/:unit", async (req, res) => {
  let { unit } = req.params
  if (!unit) {
    unit = "BTC-INR"
  }
  const [baseUnit, _] = unit.toLowerCase().split("-")
  try {
    const AllStocks = await Stock.find({})
    let allBaseUnits = AllStocks.map(stock => stock.base_unit)
    const stockToShow = AllStocks.filter(stock => stock.base_unit === baseUnit)
    // console.log({ allBaseUnits, allQuoteUnits, stockToShow })
    res.render("index", { allBaseUnits, allQuoteUnits, stockToShow })
  } catch (error) {
    console.log(error)
    res.send({ "error": "Error reaching database..." })
  }
})

app.listen(port, (req, res) => {
  console.log(`server running on port ${port}`)
})