const express = require("express")
const app = express()
const axios = require("axios")
require("dotenv").config()
const path = require("path")


const { connectMongoDB } = require("./database/connection")
const Stock = require("./database/stockSchema")
const findBestStock = require("./utils/findBestStock")

const port = process.env.PORT || 3000
const url = "https://api.wazirx.com/api/v2/tickers"
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/Hodlinfo'
const allQuoteUnits = ["inr"]

// app configuration
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))


// connect mongo database
connectMongoDB(mongoUrl)
  .then(() => {
    app.get("/", async (req, res) => {
      // get stock data from api and store stock data in database
      try {
        const result = await axios.get(url)
        const { data } = result
        let firstBaseUnit

        const stocks = Object.keys(data)

        let dataToShow = stocks.map(stock => {
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

        dataToShow = dataToShow.slice(0, 10)

        await Stock.create(dataToShow)

        res.redirect(`/${firstBaseUnit || "BTC-INR"}`)

      } catch (error) {
        console.log(error)
        res.send({ "error": "No url data" })
      }
    })

    app.get("/:unit", async (req, res) => {
      let { unit } = req.params
      if (!unit) {
        unit = "BTC-INR"
      }
      const [baseUnit, quote_unit] = unit.toLowerCase().split("-")
      try {
        const AllStocks = await Stock.find({})
        let allBaseUnits = AllStocks.map(stock => stock.base_unit)
        const stockToShow = AllStocks.filter(stock => stock.base_unit === baseUnit)
        const bestStockIndex = findBestStock(stockToShow)

        // console.log({ allBaseUnits, allQuoteUnits, stockToShow, bestStockIndex })
        res.render("index", { allBaseUnits, allQuoteUnits, stockToShow, bestStockIndex })
      } catch (error) {
        console.log(error)
        res.send({ "error": "Error reaching database..." })
      }
    })

    app.get("/connect/telegram", (req, res) => {
      res.render("telegram")
    })

    app.listen(port, (req, res) => {
      console.log(`server running on port ${port}`)
    })

  })
