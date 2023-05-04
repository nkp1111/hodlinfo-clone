const express = require("express")
const app = express()
const axios = require("axios")

const port = process.env.PORT || 3000
const url = "https://api.wazirx.com/api/v2/tickers"

app.get("/", async (req, res) => {
  try {
    const result = await axios.get(url)
    res.send(result.data)
  } catch (error) {
    res.send({ "error": "NO url data" })
    console.log(error)
  }
})

app.listen(port, (req, res) => {
  console.log(`server running on port ${port}`)
})