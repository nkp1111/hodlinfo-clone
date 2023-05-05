const stockDataToSave = (data, allQuoteUnits) => {
  /* 
  get stock data in proper format before saving to database 
  params: 
    data: all stock data as obj 
    allQuoteUnits: array of units
  returns:
    formatted stock data of 10 stocks
    base unit(stock) to show after redirect
  */
  let firstBaseUnit
  const stocks = Object.keys(data)
  let dataToSave = stocks.map(stock => {
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

  dataToSave = dataToSave.slice(0, 10)
  return { dataToSave, firstBaseUnit }
}

module.exports = stockDataToSave