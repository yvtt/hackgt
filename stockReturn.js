$(function() {
  var Aladdin = new blk.API();
  Aladdin.performanceData({
    identifiers: 'GOOG,MSFT'
  }, function(data) {
    $('#container').highcharts('StockChart', {
      rangeSelector: {
        selected: 5
      },
      title: {
        text: data.resultMap.RETURNS.map(function(returns) {
          return returns.ticker
        }).join('/') + ' Stock Return ($10,000 Investment)'
      },
      series: data.resultMap.RETURNS.map(function(returns) {
        return {
          name: returns.ticker,
          data: returns.performanceChart.map(function(point) {
            return [point[0], point[1] * 10000]
          }),
          tooltip: {
            valueDecimals: 2
          }
        }
      })
    });
  });
});
