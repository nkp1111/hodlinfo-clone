const findBestStock = (stocks) => {
  // get best stock by comparing stock sell
  let bestStockIndex = 0
  let topPrice = 0
  for (let index = 0; index < stocks.length; index++) {
    const stock = stocks[index];
    if (parseFloat(stock.sell) > topPrice) {
      topPrice = parseFloat(stock.sell)
      bestStockIndex = index
    }
  }

  return bestStockIndex
}

module.exports = findBestStock